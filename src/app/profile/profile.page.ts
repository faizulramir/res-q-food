import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api/api.service';
import { ForgetComponent } from '../forget/forget.component';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit{

  constructor(
    private modalCtrl: ModalController,
    private storage: StorageService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private api: ApiService,
    private route: ActivatedRoute,
  ) {}

  profile:any = {
    username: '',
    phone: '',
    email: '',
    address: '',
    password: '',
    newPassword: '',
    id: '',
    pic: 'https://ionicframework.com/docs/img/demos/avatar.svg'
  }

  user:any

  ngOnInit() {
    this.route.params.subscribe(async params => {
      const nav = this.router.getCurrentNavigation()
      if (nav?.extras.state) {
        let params = nav.extras.state['params']
        this.user = await this.storage.get('user')
        await this.storage.remove('user')
        this.user.pic = JSON.stringify(params.pic)
        await this.storage.set('user', this.user)
        this.profile.pic = params.pic
      }
    });
  }

  async ionViewWillEnter() {
    this.user = await this.storage.get('user')
    this.profile.username = this.user.username
    this.profile.phone = this.user.phone
    this.profile.email = this.user.email
    this.profile.address = this.user.address
    this.profile.password = this.user.password
    this.profile.id = this.user.id
    if (this.user.pic){
      this.profile.pic = JSON.parse(this.user.pic)
    }
  }

  async doLogout() {
    await this.storage.remove('token')
    await this.storage.remove('user')
    await this.storage.remove('userType')
    this.router.navigate(['auth'])
  }

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Confirm Logout?',
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
           this.doLogout();
          },
        },
      ],
    });
    await alert.present();
  }

  async goForget() {
    const modal = await this.modalCtrl.create({
      component: ForgetComponent,
    });
    modal.present();
  }

  async doSubmit() {

  }

  async goSubmit() {
    const alert = await this.alertController.create({
      header: 'Confirm Submit?',
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
           this.checkInputs();
          },
        },
      ],
    });
    await alert.present();
  }

  checkInputs() {
    if (!this.profile.username) {
      return this.presentToast("Please fill in all required fields!")
    }

    if (!this.profile.password) {
      return this.presentToast("Please fill Password fields!")
    }
    
    return this.postUser()
  }

  async presentToast(msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  async postUser() {
    const user = await this.api.updateUser(this.profile)

    if (user.data) {
      this.user = user.data
      this.storage.remove('user')
      this.storage.set('user', this.user)
      this.profile.password = ''
      this.profile.newPassword = ''
    }

    this.presentToast(user.msg)
  }
  
  async takePicture () {
    this.router.navigate(['index/tabs/profile/upload-img'])
  };
}
