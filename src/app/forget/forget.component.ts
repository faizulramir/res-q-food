import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss'],
})
export class ForgetComponent {

  constructor(
    private modalCtrl: ModalController,
    private api: ApiService,
    private toastController: ToastController,
  ) {}

  submitEmail:any = false
  successPage:any = false
  resetPage:any = false
  data:any = {
    email: null,
    password: null,
    confirmPassword: null,
    otp: null
  }

  loading:any = false
  
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async goSubmit() {
    if (!this.submitEmail) {
      this.sendOTP()
    }

    if (this.submitEmail && !this.resetPage) {
      this.loading = true
      let otpPost = await this.api.postOTP(this.data)
      if (otpPost.data) {
        this.resetPage = true
      }
      this.loading = false
      return this.presentToast(otpPost.msg)
    }

    if (this.resetPage) {
      
      if (!this.data.password && !this.data.confirmPassword) {
        return this.presentToast('Please fill in all required fields!')
      }

      if (this.data.password !== this.data.confirmPassword) {
        return this.presentToast('Password must be same!')
      }
      this.loading = true
      let resetPost = await this.api.postChangePassword(this.data)

      if (resetPost.data) {
        this.successPage = true
        setTimeout(() => {
          this.cancel()
        }, 3000);
      }

      this.loading = false
      return this.presentToast(resetPost.msg)
    }
  }

  async sendOTP() {
    this.loading = true
    let emailPost = await this.api.postForget(this.data)

    if (emailPost.data) {
      this.submitEmail = true
      this.successPage = false
    }

    this.loading = false

    return this.presentToast(emailPost.msg)
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
