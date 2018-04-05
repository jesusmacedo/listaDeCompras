import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AddItemPage } from '../add-item/add-item';
import { ProductM } from '../../models/product.model';
import { ListM } from '../../models/list.model';
import { ProductCategoryM } from '../../models/product-category.model';

@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class EditListPage {
    // Params
    list: ListM;
    allLists: Array<ListM> = [];
    // title
    title: string;
    //
    itemsByCategory: Array<{ category: string; items: ProductM[]; total: number }> = [];
    itemCategory: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private storage: Storage,
        private modalCtrl: ModalController
    ) {}

    /**
     * Receive params from previous view.
     */
    ionViewWillEnter() {
        this.allLists = this.navParams.get('allLists') as Array<ListM>;
        this.list = this.navParams.get('list') as ListM;
        this.title = this.list.name;

        if (this.list.products.length > 0) {
            console.info('products in list', this.list.products);
            this.groupProductsByCategory();
        } else {
            this.list.products = [];
        }
    }

    // User Interaction

    /**
     * Create and display the `AddItemPage` modal in order to create a new `ProductM`.
     */
    didPressAddItem(): void {
        let modal = this.modalCtrl.create(AddItemPage);

        // onWillDismiss over onDidDismiss due to better UX
        modal.onWillDismiss((data: any) => {
            if (data !== undefined) {
                let item: ProductM = data.item as ProductM;
                let category: ProductCategoryM = data.category as ProductCategoryM;
                item.category = category;
                this.list.products.unshift(item);
                console.warn('all', this.list.products);
                this.groupProductsByCategory().then(() => {
                    this.saveList();
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

    /**
     * Save the list after creating a new item.
     */
    private saveList(): void {
        for (let i: number = 0; i < this.allLists.length; i++) {
            console.info('comparing', i);
            if ((this.list.id = this.allLists[i].id)) {
                this.allLists[i] = this.list;
                break;
            }
        }

        this.storage.set('lists', this.allLists);
    }
}
