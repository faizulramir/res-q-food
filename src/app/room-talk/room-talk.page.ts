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
export class RoomTalkPage{

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

  goChat() {
    this.router.navigate(['chat'])
  }

  goCreate() {
    this.router.navigate(['index/tabs/room-talk/create-room'])
  }
}
