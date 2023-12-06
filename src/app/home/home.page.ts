import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api/api.service';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';

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
  
  async ionViewWillEnter() {
    const token = await this.storage.get('token')
    const userType = await this.storage.get('userType')

    if (!token) {
      this.router.navigate([''])
    }
    
    this.userType = userType ? userType : 0;
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
}
