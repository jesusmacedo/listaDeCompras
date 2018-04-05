import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ProductM } from '../../models/product.model';
import { ProductCategoryM } from '../../models/product-category.model';
import { ListM } from '../../models/list.model';

@Component({
    selector: 'page-add-item',
    templateUrl: 'add-item.html'
})
export class AddItemPage implements OnInit {
    // categories
    categories: Array<ProductCategoryM> = [];
    // Forms
    createForm: FormGroup;
    //
    gaming: string;

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

    didPressSave(): void {
        let name: string = this.createForm.controls['name'].value;
        let index: number = parseInt(this.createForm.controls['category'].value, 10);
        let category: ProductCategoryM = this.categories[index];
        let price: number = this.createForm.controls['price'].value;
        let numberOfItems: number = this.createForm.controls['numberOfItems'].value;

        let product: ProductM = new ProductM(name, price, numberOfItems);

        // send back the item
        this.viewCtrl.dismiss({ item: product, category: category });
    }
}
