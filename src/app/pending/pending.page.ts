import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-pending',
  templateUrl: 'pending.page.html',
  styleUrls: ['pending.page.scss']
})
export class PendingPage {

  constructor(
    private modalCtrl: ModalController,
    private storage: StorageService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private api: ApiService,
    private route: ActivatedRoute,
  ) {}

  user:any
  foods:any

  async ionViewWillEnter() {
    this.setItems()
  }

  async setItems() {
    this.user = await this.storage.get('user')
    let foods = await this.api.getFood({ status: '0' })
    foods = foods.data

    let oldFoods = await this.storage.get('foods')
    if (oldFoods) {
      await this.storage.remove('foods')
    }
    await this.storage.set('foods', foods)

    for (let index = 0; index < foods.length; index++) {
      const element = foods[index];
      foods[index].pic = JSON.parse(foods[index].pic)
      foods[index].time = moment(foods[index].time).format('hh:mm A')
    }

    this.foods = foods
  }

  async handleRefresh(event:any) {
    this.setItems()
    event.target.complete();
  }

  goDetail() {
    this.router.navigate(['food-detail'])
  }
}
