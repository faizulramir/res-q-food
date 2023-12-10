import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api/api.service';
import { Socket } from 'ngx-socket-io';
import * as moment from 'moment';
import { App } from '@capacitor/app';

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
  userRoom:any

  async ionViewWillEnter() {
    this.getRoom()

    // this.socket.disconnect();
    // this.socket.connect();
    if (this.userStatus)  this.userStatus.unsubscribe();
    if (this.userRoom)  this.userRoom.unsubscribe();
    
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
      } else if (data.event === 'chatEnter') {
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

    this.userRoom = this.socket.fromEvent('userRoom').subscribe(async (data: any) => {
      this.getRoom()
    })
  }

  async getRoom() {
    let user = await this.storage.get('user')
    if (user) {
      this.rooms = await this.api.getRoom({
        type: 'all'
      })
      this.rooms =  this.rooms.data
      if (this.rooms.length > 0) {
        for (let index = 0; index < this.rooms.length; index++) {
          
          if (this.rooms[index].users.length > 0) {
            for (let userIndex = 0; userIndex < this.rooms[index].users.length; userIndex++) {
              this.rooms[index].users[userIndex].pic = JSON.parse(this.rooms[index].users[userIndex].pic)
            }
          }
        }
      }
    }
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
    // this.offline = this.socket.emit('setOffline', this.user.id);
  }

  goCreate() {
    this.router.navigate(['index/tabs/room-talk/create-room'])
  }
}
