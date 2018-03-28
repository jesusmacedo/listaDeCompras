import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ProductCategoryM } from '../../models/product-category.model';

@Component({
    selector: 'page-add-category',
    templateUrl: 'add-category.html'
})
export class AddCategoryPage implements OnInit {
    // Forms
    createForm: FormGroup;
    // Params
    category: ProductCategoryM;
    // button
    buttonLabel: string = 'Create';
    // is edition?
    isEdit: boolean = false;

    constructor(public viewCtrl: ViewController, public navParams: NavParams, private formBuilder: FormBuilder) {}

    // Angular Lifecycle

    /**
     * Create the `FormBuilder` for this view and each `FormControl` with its owns `Validators`.
     */
    ngOnInit() {
        this.createForm = this.formBuilder.group({
            categoryName: new FormControl('', Validators.compose([Validators.required]))
        });
    }

    // Ionic Lifecycle

    ionViewWillEnter() {
        this.category = this.navParams.get('category') as ProductCategoryM;

        if (this.category !== undefined) {
            this.createForm.controls['categoryName'].setValue(this.category.name);
            this.buttonLabel = 'Edit';
        }
    }

    // User Interaction

    /**
     * Get the category name and send it back.
     */
    didPressButton(): void {
        let name: string = this.createForm.controls['categoryName'].value;

        this.viewCtrl.dismiss({ name, old: this.category });
    }
}
