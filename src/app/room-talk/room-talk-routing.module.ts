import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomTalkPage } from './room-talk.page';

const routes: Routes = [
  {
    path: '',
    component: RoomTalkPage,
  },
  {
    path: 'create-room',
    loadChildren: () => import('./create-room/create-room.module').then( m => m.CreateRoomPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomTalkPageRoutingModule {}
