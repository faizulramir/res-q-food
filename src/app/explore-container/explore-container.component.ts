import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api/api.service';
@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {

  @Input() name?: string;
  @Input() pic?: string;
  @Input() detail?: string;
  @Input() quantity?: string;
  @Input() time?: string;
  @Input() address?: string;
  @Input() status?: any;
  @Input() id?: any;
  @Input() userID?: any;

  constructor(
    private modalCtrl: ModalController,
    private storage: StorageService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private api: ApiService,
    private route: ActivatedRoute,
  ) {}

  async goDetail(name:any) {
    let food = await this.storage.get('food')
    
    if (food) {
      await this.storage.remove('food')
    }

    await this.storage.set('food', {
      id: this.id,
      name: name,
      pic: this.pic,
      detail: this.detail,
      quantity: this.quantity,
      time: this.time,
      address: this.address,
      status: this.status,
      userID: this.userID
    })

    this.router.navigate(['food-detail'])
  }
}
