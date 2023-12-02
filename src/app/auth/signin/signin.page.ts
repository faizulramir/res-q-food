import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage {

  constructor(
    private modalCtrl: ModalController,
    private storage: StorageService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private api: ApiService,
    private route: ActivatedRoute,
  ) { }


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

  doLogin() {
    this.router.navigate(['index/tabs/home'])
  }
}
