import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { ForgetComponent } from 'src/app/forget/forget.component';
import { Socket } from 'ngx-socket-io';

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
    private socket: Socket,
  ) { }

  login: any = {
    username: '',
    password: ''
  }

  loginData:any 

  async ionViewWillEnter() {
    const token = await this.storage.get('token')

    if (token) {
      this.router.navigate(['/index/tabs/home'])
    }
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

  async doLogin() {
    if (this.login.username && this.login.password) {
      this.loginData = await this.api.postLogin(this.login)
      if (this.loginData) {
        this.presentToast('Authenticating')
        if (this.loginData.status == 'Error') {
          this.presentToast(this.loginData.msg)
        } else {
          this.presentToast(this.loginData.msg)
          this.storage.set('token', this.loginData.token)
          this.storage.set('user', this.loginData.user)
          this.storage.set('userType', this.loginData.user.type)

          const pnToken = await this.storage.get('pnToken')
          let postPNToken = await this.api.postPNToken(pnToken, this.loginData.user.id)
          if (postPNToken) {
            this.socket.connect();
            this.socket.emit('setOnline', this.loginData.user.id);
            this.router.navigate(['index/tabs/home'])
          }
        }
      }
    } else {
      this.presentToast('Please fill in required fields!')
    }
  }

  async presentToast(msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  async goForget() {
    const modal = await this.modalCtrl.create({
      component: ForgetComponent,
    });
    modal.present();
  }
}
