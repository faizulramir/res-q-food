import { Component, ElementRef, ViewChild } from '@angular/core';
import { Swiper } from 'swiper';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper:any;

  constructor(
    private modalCtrl: ModalController,
    private storage: StorageService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private api: ApiService,
    private route: ActivatedRoute,
  ) { }

  prevBtn:boolean = false
  nextBtn:boolean = true

  swiperInit(event: any) {
    this.swiper = event.detail[0];
  }

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }

  goNext() {
    this.swiper?.slideNext();
  }

  goPrev() {
    this.swiper?.slidePrev();
  }

  goLogin() {
    this.router.navigate(['auth'])
  }
}
