import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api/api.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-room-talk',
  templateUrl: 'room-talk.page.html',
  styleUrls: ['room-talk.page.scss']
})
export class RoomTalkPage {

  constructor(
    private modalCtrl: ModalController,
    private storage: StorageService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private api: ApiService,
    private route: ActivatedRoute,
    private socket: Socket,
  ) {}

  rooms:any
  onlines: any[] = [];
  user:any
  onlineUsers: any[] = [];
  con:any
  userStatus:any
  
  async ionViewWillEnter() {
    this.socket.connect();
    this.user = await this.storage.get('user')
    this.socket.emit('setOnline', this.user.id);
    this.userStatus = this.socket.fromEvent('userStatus').subscribe(async (data: any) => {
      if (data.event === 'chatLeft') {
        this.onlineUsers = this.onlineUsers.filter((e:any) => e.id !== data.user)
      } else {
        let user = await this.api.getUser({ id: data.user })
        user.data.pic = JSON.parse(user.data.pic)
        this.onlineUsers = this.onlineUsers.filter((e:any) => e.id !== data.user)
        this.onlineUsers.push(user.data)
      }
    });

    this.rooms = await this.api.getRoom({
      type: 'all'
    })
    this.rooms = this.rooms.data
  }

  goChat(roomID:any) {
    this.router.navigate(['chat'])
  }

  ionViewWillLeave() {
    this.socket.emit('setOffline', this.user.id);
    this.userStatus.unsubscribe();
  }

  ionViewDidLeave() {
    this.socket.disconnect();
  }
  goCreate() {
    this.router.navigate(['index/tabs/room-talk/create-room'])
  }
}
