import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';
import { ApiService } from '../services/api/api.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss'],
})
export class NotificationModalComponent {

  name:any
  user:any
  notis:any

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private api: ApiService,
    private storage: StorageService,
    private toastController: ToastController,
    private alertController: AlertController,
  ) {}

  async ionViewWillEnter() {
    const token = await this.storage.get('token')
    this.user = await this.storage.get('user')

    if (!token) {
      this.router.navigate([''])
    }

    this.getNotifications()
  }

  async getNotifications() {
    this.notis = await this.api.getNotifications(this.user.id)
    if (this.notis.data.length > 0) {
      this.notis.data.forEach((e:any) => {
        e.msg = JSON.parse(JSON.parse(e.msg))
      });
    }
    this.notis = this.notis.data
  }

  async deleteNotifications(notiID:any) {
    let data = await this.api.deleteNotifications(this.user.id, notiID)
    this.presentToast(data.msg)

    if (data.data) {
      this.notis = this.notis.filter((e:any) => e.id !== notiID)
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

  async confirmDelete(notiID:any) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete?',
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
           this.deleteNotifications(notiID);
          },
        },
      ],
    });
    await alert.present();
  }

  async handleRefresh(event:any) {
    this.getNotifications()
    event.target.complete()
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
}