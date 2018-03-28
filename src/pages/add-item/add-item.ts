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
        this.storage.get('categories').then((categories: Array<ProductCategoryM>) => {
            console.info('categories?', categories);
        });
    }

    // Angular Lifecycle

    /**
     * Create the `FormBuilder` for this view and each `FormControl` with its owns `Validators`.
     */
    ngOnInit() {
        this.createForm = this.formBuilder.group({
            itemName: new FormControl('', Validators.compose([Validators.required])),
            itemCategory: new FormControl('', Validators.compose([Validators.required])),
            itemPrice: new FormControl('', Validators.compose([Validators.required])),
            numberOfItems: new FormControl('', Validators.compose([Validators.required]))
        });
    }

    // User Interaction

    didPressSave(): void {
        let name: string = this.createForm.controls['itemName'].value;
        let category: ProductCategoryM = this.createForm.controls['itemName'].value as ProductCategoryM;
        let price: number = this.createForm.controls['itemName'].value;
        let numberOfItems: number = this.createForm.controls['itemName'].value;

        let product: ProductM = new ProductM(name, category, price, numberOfItems);

        // send back the item
        this.viewCtrl.dismiss({ item: product });
    }
}
