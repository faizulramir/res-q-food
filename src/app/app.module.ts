import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'https://powerful-blessed-falcon.ngrok-free.app/', options: {
  extraHeaders: {
    "ngrok-skip-browser-warning": "123123"
  }
} };
import { ForgetComponent } from './forget/forget.component';
import { NotificationModalComponent } from './notification-modal/notification-modal.component';
import { RegisterModalComponent } from './auth/register-modal/register-modal.component';

@NgModule({
  declarations: [AppComponent, ForgetComponent, NotificationModalComponent, RegisterModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(), FormsModule, SocketIoModule.forRoot(config)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
