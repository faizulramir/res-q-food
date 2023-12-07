import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostImgPageRoutingModule } from './post-img-routing.module';

import { PostImgPage } from './post-img.page';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostImgPageRoutingModule,
    ImageCropperModule
  ],
  declarations: [PostImgPage]
})
export class PostImgPageModule {}
