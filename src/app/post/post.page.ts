import { Component, OnInit } from '@angular/core';
import { RangeCustomEvent } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-post',
  templateUrl: 'post.page.html',
  styleUrls: ['post.page.scss']
})
export class PostPage implements OnInit{

  constructor(
    private modalCtrl: ModalController,
    private storage: StorageService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private api: ApiService,
    private route: ActivatedRoute,
  ) {}
  
  post:any = {
    detail: '',
    quantity: 1,
    time: new Date(),
    address: '',
    user_id: '',
    pic: 'https://ionicframework.com/docs/img/demos/thumbnail.svg'
  }

  user:any

  ngOnInit() {
    this.route.params.subscribe(async params => {
      const nav = this.router.getCurrentNavigation()
      if (nav?.extras.state) {
        let params = nav.extras.state['params']
        this.post.pic = params.pic
      }
    });
  }

  async ionViewWillEnter() {
    this.user = await this.storage.get('user')
    this.user.pic = JSON.parse(this.user.pic)
    this.post.user_id = this.user.id
  }

  onIonKnobMoveEnd(ev: Event) {
    this.post.quantity = (ev as RangeCustomEvent).detail.value
  }
  
  onIonKnobMoveStart(ev: Event) {
    // this.quantity = (ev as RangeCustomEvent).detail.value
  }

  async confirmPost() {
    const alert = await this.alertController.create({
      header: 'Confirm Post?',
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
           this.doSubmit();
          },
        },
      ],
    });
    await alert.present();
  }

  doChecking() {
    
    if (this.post.detail && this.post.quantity && this.post.time && this.post.address) {

      if (this.post.pic === 'https://ionicframework.com/docs/img/demos/thumbnail.svg') {
        return this.presentToast('Please add image!')
      }

      return this.confirmPost()
    }

    return this.presentToast('Please fill in all the fields!')
  }

  async doSubmit() {
    let data = this.post
    data.pic = JSON.stringify(data.pic)
    
    let postFood = await this.api.postFood(data)
    if (postFood.msg) {
      this.clearData()
      this.presentToast(postFood.msg)
      this.router.navigate(['index/tabs/history'])
    }
  }

  clearData() {
    this.post = {
      detail: '',
      quantity: 1,
      time: new Date(),
      address: '',
      user_id: '',
      pic: 'https://ionicframework.com/docs/img/demos/thumbnail.svg'
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

  async takePicture () {
    this.router.navigate(['index/tabs/post/post-img'])
  };
}
