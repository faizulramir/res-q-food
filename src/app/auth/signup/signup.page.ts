import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private storage: StorageService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private api: ApiService,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController
  ) { }

  register:any = {
    username: '',
    email: '',
    password: '',
    phone: '',
    userType: '',
    registrationNumber: ''
  }

  registerData:any

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      const nav = this.router.getCurrentNavigation()
      if (nav?.extras.state) {
        let params = nav.extras.state['params']
        
        if (params) {
          this.register.userType = params.type
        }
      }
    });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
  }

  async ionViewWillEnter() {
    const token = await this.storage.get('token')
    
    if (token) {
      this.router.navigate(['/index/tabs/home'])
    }
  }

  async doSignUp() {
    if (this.register.password.length > 10) return this.presentToast("Password must be less than 10 characters");

    if (!/^[a-zA-Z0-9]*$/.test(this.register.password)) return this.presentToast("Password must be a combination of letters and numbers");

    if (!this.register.username && !this.register.email && !this.register.password && !this.register.phone) return this.presentToast("Please fill in required fields!")

    this.showLoading()
    this.registerData = await this.api.postRegister(this.register)

    if (this.registerData) {
      if (this.registerData.message) {
        this.loadingCtrl.dismiss();
        this.presentToast(this.registerData.message)
      } else {
        this.presentToast('Registering')
        if (this.registerData.status == 'Error') {
          this.presentToast(this.registerData.msg)
        } else {
          this.presentToast('Success!')
          this.goSignIn()
        }
        this.loadingCtrl.dismiss();
      }
    }
  }

  goSignIn() {
    this.router.navigate(['auth/signin'])
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
