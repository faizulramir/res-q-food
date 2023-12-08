import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.page.html',
  styleUrls: ['./create-room.page.scss'],
})
export class CreateRoomPage {

  constructor(
    private _location: Location,
    private modalCtrl: ModalController,
    private storage: StorageService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private api: ApiService,
    private route: ActivatedRoute,
  ) { }

  title:any

  checkInputs() {
    if (!this.title) {
      return this.presentToast("Please insert spaces name field!")
    }

    return this.goSubmit()
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
           this.doSubmit();
          },
        },
      ],
    });
    await alert.present();
  }

  async doSubmit() {
    let user = await this.storage.get('user')
    let room = await this.api.postRoom({
      title: this.title,
      user_id: user.id
    })

    if (room.data && user.type == 1) {
      this.presentToast(room.msg)
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
  
  goBack() {
    this._location.back()
  }
}
