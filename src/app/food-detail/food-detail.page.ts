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
    this.userType = await this.storage.get('userType')
    this.user = await this.api.getUser({ id: this.food.userID })
    this.user = this.user.data

    this.user.pic = JSON.parse(this.user.pic)
  }

  goHistory() {
    this._location.back()
  }

  async acceptFood() {
    let food = await this.api.acceptFood({ id: this.food.id })
    if (food.msg) {
      this.food = food.data
      this.food.pic = JSON.parse(this.food.pic)
      await this.storage.remove('food')
      await this.storage.set('food', this.food)
      this.presentToast(food.msg)
      this.router.navigate(['index/tabs/completed'])
    }
  }

  async goSubmit() {
    const alert = await this.alertController.create({
      header: 'Confirm Accept?',
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Canceled");
          },
        },
        {
          text: "OK",
          handler: () => {
           this.acceptFood();
          },
        },
      ],
    });
    await alert.present();
  }

  async presentToast(msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }
}
