import { Component, OnInit } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ProductM } from '../../models/product.model';
import { ProductCategoryM } from '../../models/product-category.model';

@IonicPage()
@Component({
    selector: 'page-add-item-to-list',
    templateUrl: 'add-item-to-list.html'
})
export class AddItemToListPage implements OnInit {
    // Forms
    createForm: FormGroup;
    // categories
    categories: Array<ProductCategoryM> = [];
    // params
    id: number = 0;
    item: ProductM;
    // state params
    title: string = 'Create';
    header: string = 'Add new item';

    constructor(
        public viewCtrl: ViewController,
        public navParams: NavParams,
        private storage: Storage,
        private formBuilder: FormBuilder
    ) {}

    // Ionic Lifecycle

    /**
     * Load the previously stored lists when this page is loaded.
     */
    ionViewDidLoad() {
        this.storage.get('categories').then((categories: ProductCategoryM[]) => {
            this.categories = categories;
        });
    }

    // Ionic Lifecycle

    /**
     * Receive params from previous view.
     */
    ionViewWillEnter() {
        this.id = this.navParams.get('id');
        this.item = this.navParams.get('item') as ProductM;

        if (this.item !== undefined) {
            this.createForm.controls['name'].setValue(this.item.name);
            this.createForm.controls['category'].setValue(this.item.category.id);
            this.createForm.controls['price'].setValue(this.item.price);
            this.createForm.controls['numberOfItems'].setValue(this.item.numberOfItems);
            this.title = 'Editing';
            this.header = 'Edit the item';
        }
    }

    // Angular Lifecycle

    /**
     * Create the `FormBuilder` for this view and each `FormControl` with its owns `Validators`.
     */
    ngOnInit() {
        this.createForm = this.formBuilder.group({
            name: new FormControl('', Validators.compose([Validators.required])),
            category: new FormControl('', Validators.compose([Validators.required])),
            price: new FormControl('', Validators.compose([Validators.required])),
            numberOfItems: new FormControl('', Validators.compose([Validators.required]))
        });
    }

    // User Interaction

    /**
     * Create a new `ProductM` and return it to the caller page.
     */
    didPressSave(): void {
        let id: number = this.id !== undefined ? this.id : this.item.id;
        let name: string = this.createForm.controls['name'].value;
        let index: number = this.createForm.controls['category'].value;
        let category: ProductCategoryM = this.categories[index];
        let price: number = this.createForm.controls['price'].value;
        let numberOfItems: number = this.createForm.controls['numberOfItems'].value;

        let product: ProductM = new ProductM(id, name, price, numberOfItems, category);

        // send back the item
        this.viewCtrl.dismiss({ item: product, category: category });
    }

    /**
     * Dismiss this modal.
     */
    didPressClose(): void {
        this.viewCtrl.dismiss();
    }
}
