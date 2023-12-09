import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api/api.service';
import { Socket } from 'ngx-socket-io';
import * as moment from 'moment';

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
  onlineUsers:any;
  con:any
  userStatus:any
  offline:any

  async ionViewWillEnter() {
    this.socket.connect();
    this.user = await this.storage.get('user')
    this.socket.emit('setOnline', this.user.id);
    this.userStatus = this.socket.fromEvent('userStatus').subscribe(async (data: any) => {
      if (data.event === 'chatLeft') {
        let updateUser = await this.api.updateUser({ id: data.user, online: "0" })
        if (updateUser.data) {
          updateUser = updateUser.data
          
          for (let index = 0; index < updateUser.length; index++) {
            const element = updateUser[index];
            updateUser[index].pic = JSON.parse(updateUser[index].pic)
          }
  
          this.onlineUsers = updateUser
        }
      } else {
        let updateUser = await this.api.updateUser({ id: data.user, online: "1" })
        if (updateUser.data) {
          updateUser = updateUser.data
          
          for (let index = 0; index < updateUser.length; index++) {
            const element = updateUser[index];
            updateUser[index].pic = JSON.parse(updateUser[index].pic)
          }
  
          this.onlineUsers = updateUser
        }
      }
    });
    
    this.rooms = await this.api.getRoom({
      type: 'all'
    })
    this.rooms = this.rooms.data
  }

  goChat(roomID:any) {
    let navigationExtras: NavigationExtras = {
      state: { 
        params: {
          roomID: roomID,
        }
      },
      replaceUrl: false,
    };
    
    this.router.navigate(['chat'], navigationExtras)
  }

  async ionViewWillLeave() {
    this.offline = this.socket.emit('setOffline', this.user.id);
  }

  ionViewDidLeave() {
    if (this.offline) {
      this.userStatus.unsubscribe();
      this.socket.disconnect();
    }
  }
  goCreate() {
    this.router.navigate(['index/tabs/room-talk/create-room'])
  }
}
