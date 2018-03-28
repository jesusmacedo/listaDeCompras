import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AddCategoryPage } from '../add-category/add-category';
import { ProductCategoryM } from '../../models/product-category.model';

@Component({
    selector: 'page-categories',
    templateUrl: 'categories.html'
})
export class CategoriesPage {
    // categories
    categories: Array<ProductCategoryM> = [];

    constructor(public navCtrl: NavController, private storage: Storage, private modalCtrl: ModalController) {}

    // Ionic Lifecycle

    /**
     * Load the previously stored lists when this page is loaded.
     */
    ionViewDidLoad() {
        this.storage.get('categories').then((categories: Array<ProductCategoryM>) => {
            console.info('categories?', categories);
            if (categories !== null) {
                this.categories = categories;
            }
        });
    }

    // User Interaction

    didPressAddCategory(): void {
        let modal = this.modalCtrl.create(AddCategoryPage);

        // onWillDismiss over onDidDismiss due to better UX
        modal.onWillDismiss((data: any) => {
            if (data !== undefined) {
                console.info('name', data.name);
                let id: number = this.categories.length;

                this.categories.unshift({ id: id, name: data.name });
                this.storage.set('categories', this.categories);
            }
        });

        modal.present();
    }

    categorySelected(category: ProductCategoryM): void {
        console.info(category);
        let modal = this.modalCtrl.create(AddCategoryPage, { category: category });

        // onWillDismiss over onDidDismiss due to better UX
        modal.onWillDismiss((data: any) => {
            if (data !== undefined) {
                console.info('name', data.old);
                let index: number = this.categories.findIndex(c => c == data.old);
                console.info('index', index);
                if (index > -1) {
                    this.categories.splice(index, 1);
                }

                /*this.categories.unshift({ id: id, name: data.name });
                this.storage.set('categories', this.categories);*/
            }
        });

        modal.present();
    }
}
