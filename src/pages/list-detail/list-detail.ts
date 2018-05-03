import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ProductM } from '../../models/product.model';
import { ListM } from '../../models/list.model';
import { ProductCategoryM } from '../../models/product-category.model';
import { Lists } from '../../singletons/lists';

@IonicPage()
@Component({
    selector: 'page-list-detail',
    templateUrl: 'list-detail.html'
})
export class ListDetailPage {
    // params
    list: ListM;
    // title
    title: string;
    // items sorting
    itemsByCategory: Array<{ category: string; items: ProductM[]; total: number }> = [];
    itemCategory: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public lists: Lists,
        private storage: Storage,
        private modalCtrl: ModalController
    ) {}

    // Ionic Lifecycle

    /**
     * Receive params from previous view.
     */
    ionViewWillEnter() {
        this.list = this.navParams.get('list') as ListM;
        this.title = this.list.name;

        if (this.list.products.length > 0) {
            console.info('products/:', this.list.products);
            this.groupProductsByCategory();
        } else {
            console.info('no products in list');
            this.list.products = [];
        }
    }

    // User Interaction

    /**
     * Create and display the `AddItemToListPage` modal in order to create a new `ProductM` and update the `ListM`.
     */
    didPressAddItem(): void {
        let id: number = 1 + this.list.products.length;
        let modal = this.modalCtrl.create('AddItemToListPage', { id: id });

        // onWillDismiss over onDidDismiss due to better UX
        modal.onWillDismiss((data: any) => {
            if (data !== undefined) {
                let item: ProductM = data.item as ProductM;

                this.list.products.unshift(item);
                this.groupProductsByCategory().then(() => {
                    this.lists.updateList(this.list);
                });
            }
        });

        modal.present();
    }

    /**
     * Send the selected item to be updated.
     * @param item to be updated.
     * @param index of the item.
     */
    didPressItem(item: ProductM, index: number): void {
        let modal = this.modalCtrl.create('AddItemToListPage', { item: item });

        // onWillDismiss over onDidDismiss due to better UX
        modal.onWillDismiss((data: any) => {
            if (data !== undefined) {
                let item: ProductM = data.item as ProductM;
                let category: ProductCategoryM = data.category as ProductCategoryM;
                item.category = category;

                this.list.products[index] = item;
                this.groupProductsByCategory().then(() => {
                    this.lists.updateList(this.list);
                });
            }
        });

        modal.present();
    }

    didPressPay(): void {
        this.navCtrl.pop();
    }

    // Private Methods

    /**
     * Organize the items by category (for displaying purposes).
     */
    groupProductsByCategory(): Promise<boolean> {
        this.itemsByCategory = [];
        let categories: string[] = [];
        let total: number = 0.0;

        for (const product of this.list.products) {
            categories.unshift(product.category.name);
        }

        // remove duplicates from array
        categories = Array.from(new Set(categories));

        // create a group for each
        for (const category of categories) {
            let items: ProductM[] = [];
            let group: { category: string; items: ProductM[]; total: number } = {
                category: category,
                items: items,
                total: 0.0
            };
            let totalByCategory: number = 0.0;

            for (const product of this.list.products) {
                if (product.category.name === category) {
                    // make additions by category and global
                    total += product.price * product.numberOfItems;
                    totalByCategory += product.price * product.numberOfItems;

                    items.unshift(product);
                }
            }

            // sort products and total by category before addind them to the group
            group.items = group.items.sort();
            group.total = totalByCategory;

            this.itemsByCategory.unshift(group);
        }

        // assign the global amount to pay
        this.list.total = total;

        return new Promise(resolve => {
            resolve(true);
        });
    }
}
