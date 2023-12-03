import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PendingPage } from './pending.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PendingPageRoutingModule } from './pending-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    PendingPageRoutingModule
  ],
  declarations: [PendingPage]
})
export class PendingPageModule {}
