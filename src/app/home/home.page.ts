import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api/api.service';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(
    private modalCtrl: ModalController,
    private storage: StorageService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private api: ApiService,
    private route: ActivatedRoute,
  ) {}

  userType:any
  user:any
  foods:any
  counts:any

  async ionViewWillEnter() {
    this.setItems()
  }

  goDonate() {
    this.router.navigate(['index/tabs/post'])
  }

  async openNotification() {
    const modal = await this.modalCtrl.create({
      component: NotificationModalComponent,
    });
    modal.present();
  }

  goHistory(id:any) {
    let navigationExtras: NavigationExtras = {
      state: { 
        params: {
          foodID: id,
        }
      },
      replaceUrl: false,
    };
    
    this.router.navigate(['index/tabs/history'], navigationExtras)
  }

  goPending(id:any) {
    let navigationExtras: NavigationExtras = {
      state: { 
        params: {
          foodID: id,
        }
      },
      replaceUrl: false,
    };
    this.router.navigate(['index/tabs/pending'], navigationExtras)
  }

  async setItems() {
    const token = await this.storage.get('token')
    const userType = await this.storage.get('userType')

    if (!token) {
      this.router.navigate([''])
    }
    
    this.userType = userType ? userType : 0;

    this.user = await this.storage.get('user')

    if (this.user.type == 0) {
      this.foods = await this.api.getFood({ user_id: this.user.id })
      this.foods = this.foods.data
      // this.foods = this.foods.filter((e:any) =>  e.status == 1 && moment(e.updated_at).isSame(new Date(), 'day'))
      
    } else {
      this.foods = await this.api.getFood({ status: '0', limit: true })
      this.counts = this.foods.count
      this.foods = this.foods.data
    }
    
    for (let index = 0; index < this.foods.length; index++) {
      const element = this.foods[index];
      this.foods[index].pic = JSON.parse(this.foods[index].pic)
      this.foods[index].time = moment(this.foods[index].time).format('hh:mm A')
      if (this.foods[index].accept_by !== null && this.foods[index].accept_by !== 0) {
        this.foods[index].accepted_name = await this.api.getUser({ id: this.foods[index].accept_by })
        this.foods[index].accepted_name = this.foods[index].accepted_name.data.username
      }
    }
    
  }
}
