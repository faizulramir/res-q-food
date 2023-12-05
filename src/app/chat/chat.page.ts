import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  data:any = {
    chatName: ''
  }
  ngOnInit() {
    this.socket.connect();
    this.socket.emit('setUserName', this.data.chatName);
    this.setUserActivityEvent();

    this.socket.fromEvent('message').subscribe(message => {
      this.messages.push(message);
    });
  }
  setUserActivityEvent() {
    this.socket.fromEvent('usersActivity').subscribe((data: any) => {
      if (data.event === 'chatLeft') {
        this.presentToast(data.user + ' Left the Chat Room');
      } else {
        this.presentToast(data.user + ' Joined the Chat Room');
      }
    });
  }
  sendMessage() {
    this.socket.emit('sendTheMessage', { text: this.message });
    this.message = '';
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  async presentToast(msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  goBack() {
    this._location.back()
  }
}
