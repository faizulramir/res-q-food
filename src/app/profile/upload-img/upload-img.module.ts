import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadImgPageRoutingModule } from './upload-img-routing.module';

import { UploadImgPage } from './upload-img.page';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadImgPageRoutingModule,
    ImageCropperModule
  ],
  declarations: [UploadImgPage]
})
export class UploadImgPageModule {}
