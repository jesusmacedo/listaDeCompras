import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ProductCategoryM } from '../../models/product-category.model';

@IonicPage()
@Component({
    selector: 'page-admin-categories',
    templateUrl: 'admin-categories.html'
})
export class AdminCategoriesPage {
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

    /**
     * Create and display a `AddCategoryPage` modal in order to create a new Category.
     */
    didPressAddCategory(): void {
        let modal = this.modalCtrl.create('AddCategoryPage');

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

    /**
     * Take the selected category to the edit/create modal in order to modify it.
     * @param category to be edited.
     */
    didSelectCategory(category: ProductCategoryM): void {
        let modal = this.modalCtrl.create('AddCategoryPage', { category: category });

        // onWillDismiss over onDidDismiss due to better UX
        modal.onWillDismiss((data: any) => {
            if (data !== undefined) {
                let index: number = this.categories.findIndex(c => c == data.old);

                if (index > -1) {
                    this.categories[index].name = data.name;
                    this.storage.set('categories', this.categories);
                }
            }
        });

        modal.present();
    }
}
