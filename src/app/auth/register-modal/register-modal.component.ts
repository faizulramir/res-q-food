import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent{

  constructor(private modalCtrl: ModalController) {}
  
  name: string = '';
  
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  goSignUp(type:any) {
    return this.modalCtrl.dismiss(type, 'type');
  }

}
