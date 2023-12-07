import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import {
  ImageCroppedEvent,
  ImageCropperComponent,
  ImageTransform,
} from 'ngx-image-cropper';
import { Camera, CameraResultType } from '@capacitor/camera';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-post-img',
  templateUrl: './post-img.page.html',
  styleUrls: ['./post-img.page.scss'],
})

export class PostImgPage {
  @ViewChild('cropper') cropper: ImageCropperComponent | undefined;
  myImage: any = null;
  croppedImage: any = '';
  transform: ImageTransform = {};
  isMobile = Capacitor.getPlatform() !== 'web';
  user:any

  constructor(
    private loadingCtrl: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private storage: StorageService,
    private api: ApiService,
  ) { }

  async ionViewWillEnter() {
    this.user = await this.storage.get('user')
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });
    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.myImage = `data:image/jpeg;base64,${image.base64String}`;
    this.croppedImage = null;
  }

  // Called when cropper is ready
  imageLoaded() {
    this.loadingCtrl.dismiss();
  }

  // Called when we finished editing (because autoCrop is set to false)
  async imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = await this.blobToBase64(event.blob);
    let navigationExtras: NavigationExtras = {
      state: { 
        params: {
          pic: this.croppedImage,
        }
      },
      replaceUrl: false,
    };
    this.router.navigate(['index/tabs/post'], navigationExtras)
  }

  goBack() {
    this.router.navigate(['index/tabs/post'])
  }

  async presentToast(msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  blobToBase64(blob:any) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  // We encountered a problem while loading the image
  loadImageFailed() {
    console.log('Image load failed!');
  }

  // Manually trigger the crop
  cropImage() {
    this.cropper?.crop();
    this.myImage = null;
  }

  // Discard all changes
  discardChanges() {
    this.myImage = null;
    this.croppedImage = null;
  }

  // Edit the image
  rotate() {
    const newValue = ((this.transform.rotate ?? 0) + 90) % 360;

    this.transform = {
      ...this.transform,
      rotate: newValue,
    };
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH,
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV,
    };
  }

}
