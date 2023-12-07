import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api/api.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.page.html',
  styleUrls: ['./food-detail.page.scss'],
})
export class FoodDetailPage {

  userType:any = 0
  name:any
  food:any
  user:any

  constructor(
    private modalCtrl: ModalController,
    private storage: StorageService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private api: ApiService,
    private route: ActivatedRoute,
    private _location: Location
  ) { }
  
  async ionViewWillEnter() {
    this.food = await this.storage.get('food')
    this.user = await this.storage.get('user')

    this.user.pic = JSON.parse(this.user.pic)
  }

  goHistory() {
    this._location.back()
  }
}
