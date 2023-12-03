import { Component } from '@angular/core';
import { RangeCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-post',
  templateUrl: 'post.page.html',
  styleUrls: ['post.page.scss']
})
export class PostPage {

  constructor() {}

  quantity:any = 1

  onIonKnobMoveEnd(ev: Event) {
    this.quantity = (ev as RangeCustomEvent).detail.value
  }
  

  onIonKnobMoveStart(ev: Event) {
    // this.quantity = (ev as RangeCustomEvent).detail.value
  }
}
