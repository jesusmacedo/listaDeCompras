import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AddItemPage } from '../add-item/add-item';

@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage {
    // Params
    name: string;
    // is new ?
    isNew: boolean = true;
    // title
    title: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private storage: Storage,
        private modalCtrl: ModalController
    ) {}

    ionViewWillEnter() {
        this.name = this.navParams.get('name');
        this.isNew = this.name !== undefined ? true : false;
        this.title = this.name !== undefined ? 'New List' : this.name;
    }

    // User Interaction

    didPressAddItem(): void {
        let modal = this.modalCtrl.create(AddItemPage);

        // onWillDismiss over onDidDismiss due to better UX
        modal.onWillDismiss((data: any) => {
            if (data !== undefined) {
                console.info('item', data);
            }
        });

        modal.present();
    }

    didPressPay(): void {
        this.navCtrl.pop();
    }
}
