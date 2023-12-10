import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonContent } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { Socket } from 'ngx-socket-io';
import { Location } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content!: IonContent;
  constructor(
    private modalCtrl: ModalController,
    private storage: StorageService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private api: ApiService,
    private route: ActivatedRoute,
    private socket: Socket,
    private _location: Location
  ) { }

  message = '';
  messages: any[] = [];
  currentUser:any = ''
  user:any
  messageEvent:any
  userEvent:any
  onlineUsers: any[] = [];
  leftChat:any
  roomID:any

  async ngOnInit() {
    this.route.params.subscribe(params => {
      const nav = this.router.getCurrentNavigation()
      if (nav?.extras.state) {
        let params = nav.extras.state['params']
        
        if (params) {
          this.roomID = params.roomID
        }
      }
    });

    // this.socket.disconnect()
    // this.socket.connect()
    
  }

  async ionViewWillEnter() {
    // console.log('oi')
    this.socket.disconnect()
    this.socket.connect()
    if (this.messageEvent) this.messageEvent.unsubscribe()
    if (this.userEvent) this.userEvent.unsubscribe()

    this.user = await this.storage.get('user')
    this.currentUser = this.user.username
    let msgs = await this.api.getChat({ room_id: this.roomID })
    this.messages = msgs.data
    this.goToBottom()

    this.socket.emit('setUserName', this.user.id)

    this.setUserActivityEvent()

    this.messageEvent = this.socket.fromEvent('message').subscribe(async (message:any) => {
      if (message.user === this.user.id) {
        // let user = this.onlineUsers.find((e:any) => e.id == message.user)
        // message.user = user
        this.messages.push({
          msg: 'Sending..',
          user: "system",
          created_at: new Date()
        })
        let updateMsg = await this.api.postChat({ msg: message.msg, user_id: this.user.id, room_id: this.roomID })
        if (updateMsg) {
          this.messages.pop()
        }
      }
      let user = this.onlineUsers.find((e:any) => e.id == message.user)
      message.user = user
      this.messages.push(message)
      this.goToBottom()
    });
  }

  goToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 100);
  }

  setUserActivityEvent() {
    this.userEvent = this.socket.fromEvent('usersActivity').subscribe(async (data: any) => {
      let updateUserRoom
      if (data.event === 'chatLeft') {
        updateUserRoom = await this.api.updateUser({ id: data.user, roomID: "0", currentRoom: this.roomID })
      } else {
        updateUserRoom = await this.api.updateUser({ id: data.user, roomID: this.roomID, currentRoom: this.roomID  })
      }

      let user = await this.api.getUser({ id: this.user.id })
      user = user.data
      if (!user.inRoom) this.router.navigate(['index/tabs/room-talk'])

      if (updateUserRoom.data) {
        if (data.event !== 'chatLeft') {
          this.socket.emit('setUserEnterRoom', this.user.id)
        } else {
          this.socket.emit('setUserLeaveRoom', this.user.id)
        }
        for (let index = 0; index < updateUserRoom.data.length; index++) {
          const element = updateUserRoom.data[index];
          updateUserRoom.data[index].pic = JSON.parse(updateUserRoom.data[index].pic)
        }

        this.onlineUsers = updateUserRoom.data
      }
    });
  }

  sendMessage() {
    this.socket.emit('sendTheMessage', { text: this.message })
    this.message = ''
  }

  ionViewWillLeave() {
    // this.leftChat = this.socket.emit('setLeftChat', this.user.id)
    // this.socket.emit('setUserLeaveRoom', this.user.id)
    // this.socket.emit('setUserLeaveRoom', this.user.id)
    this.leftChat = this.socket.emit('setLeftChat', this.user.id)

    // if (this.leftChat) {
    //   this.messageEvent.unsubscribe()
    // this.userEvent.unsubscribe()
    // }
    
    // if (!this.userEvent) {
    //   this.socket.disconnect()
    // }
    
  }

  ionViewDidLeave() {
    if (this.leftChat) {
      this.messageEvent.unsubscribe()
      this.userEvent.unsubscribe()
    }
  }

  async presentToast(msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present()
  }

  goBack() {
    // this.leftChat = this.socket.emit('setLeftChat', this.user.id)
    
    this.router.navigate(['index/tabs/room-talk'])
  }
}
