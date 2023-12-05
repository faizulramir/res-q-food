import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';

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
  ) { }

  register:any = {
    username: '',
    email: '',
    password: '',
    phone: '',
    userType: ''
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

  async ionViewWillEnter() {
    const token = await this.storage.get('token')
    
    if (token) {
      this.router.navigate(['/index/tabs/home'])
    }
  }

  async doSignUp() {
    if (!this.register.username && !this.register.email && !this.register.password && !this.register.phone) {
      return this.presentToast("Please fill in required fields!")
    }

    this.registerData = await this.api.postRegister(this.register)

    if (this.registerData) {
      if (this.registerData.message) {
        this.presentToast(this.registerData.message)
      } else {
        this.presentToast('Authenticating')
        if (this.registerData.status == 'Error') {
          this.presentToast(this.registerData.msg)
        } else {
          this.presentToast(this.registerData.msg)
          this.storage.set('token', this.registerData.token)
          this.storage.set('user', this.registerData.user)
          this.storage.set('userType', this.registerData.user.type)
          this.router.navigate(['index/tabs/home'])
        }
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
