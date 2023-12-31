import { Component, OnInit } from '@angular/core';
import { FCM } from "@capacitor-community/fcm";
import { Router } from '@angular/router';
import { StorageService } from './services/storage/storage.service';
import { ApiService } from './services/api/api.service';
import { ModalController } from '@ionic/angular';
import { NotificationModalComponent } from './notification-modal/notification-modal.component';
import { register } from 'swiper/element/bundle';
import { App } from '@capacitor/app';
import { Socket } from 'ngx-socket-io';

register();

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private storage: StorageService,
    private api: ApiService,
    private modalCtrl: ModalController,
    private socket: Socket,
    ){}

  async ngOnInit() {
    App.addListener('appStateChange', async ({ isActive }) => {
      // this.socket.disconnect();
      this.socket.connect();
      let user = await this.storage.get('user')
      if (user) {
        let userData = await this.api.getUser({ id: user.id})
        userData = userData.data
        if (!isActive) {
          this.socket.emit('setOffline', userData.id);
          this.socket.emit('setUserLeaveRoom', userData.id)
          this.socket.emit('setLeftChat', userData.id)
          // if (userData.inRoom) {
          //   this.socket.emit('setLeftChat', userData.id)
          //   this.socket.emit('setUserLeaveRoom', userData.id)
          // }
        } else {
          this.socket.emit('setOnline', userData.id);
          if (userData.inRoom) {
            this.socket.emit('setUserName', userData.id)
          }
        }
      }
    });
    
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration',
      (token: Token) => {
        this.storage.set('pnToken', token.value)
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.log('Error on registration: ' + JSON.stringify(error))
      }
    );

    FCM.subscribeTo({ topic: "resqfood" })
    .then((r) => console.log(`subscribed to topic`))
    .catch((err) => console.log(err));

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        console.log(notification)
        if (notification.data.multi === 'false' || notification.data.multi === false) {
          await this.api.postNotifications(JSON.stringify(notification), notification.data.multi, notification.data.user_id)
        } else {
          await this.api.postNotifications(JSON.stringify(notification), notification.data.multi, null)
        }
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      async (notification: ActionPerformed) => {
        const token = await this.storage.get('token')
        if (token) {
          this.openNotification()
        }
      }
    );
  }

  async openNotification() {
    const modal = await this.modalCtrl.create({
      component: NotificationModalComponent,
    });
    modal.present();
  }
}
