import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss']
})
export class HistoryPage implements OnInit{

  constructor(
    private modalCtrl: ModalController,
    private storage: StorageService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private api: ApiService,
    private route: ActivatedRoute,
  ) {}

  foodID:any = null

  ngOnInit() {
    this.route.params.subscribe(params => {
      const nav = this.router.getCurrentNavigation()
      if (nav?.extras.state) {
        let params = nav.extras.state['params']
        
        this.foodID = params.foodID
      }
    });
  }

  user:any
  foods:any

  async ionViewWillEnter() {
    this.setItems()
  }

  ionViewWillLeave() {
    this.foodID = null
  }

  async setItems() {
    this.user = await this.storage.get('user')
    this.foods = await this.api.getFood({ user_id: this.user.id })
    this.foods = this.foods.data

    for (let index = 0; index < this.foods.length; index++) {
      const element = this.foods[index];
      this.foods[index].pic = JSON.parse(this.foods[index].pic)
      this.foods[index].time = moment(this.foods[index].time).format('hh:mm A')
    }
  }

  async handleRefresh(event:any) {
    this.setItems()
    event.target.complete();
  }

  goDetail() {
    this.router.navigate(['food-detail'])
  }
}
