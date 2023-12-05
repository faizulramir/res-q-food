import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomTalkPage } from './room-talk.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { RoomTalkPageRoutingModule } from './room-talk-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RoomTalkPageRoutingModule
  ],
  declarations: [RoomTalkPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RoomTalkPageModule {}
