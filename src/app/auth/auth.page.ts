import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {

  constructor(
    private modalCtrl: ModalController,
    private storage: StorageService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private api: ApiService,
    private route: ActivatedRoute,
  ) { }

  goSignIn() {
    this.router.navigate(['auth/signin'])
  }

  goSignUp(type:any) {
    let navigationExtras: NavigationExtras = {
      state: { 
        params: {
          type: type,
        }
      },
      replaceUrl: false,
    };
    this.router.navigate(['auth/signup'], navigationExtras)
  }

  async ionViewWillLeave() {
    let modal = await this.modalCtrl.getTop()

    if (modal) {
      modal.dismiss()
    }
  }
}
