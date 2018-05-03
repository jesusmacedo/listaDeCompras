import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ListM } from '../../models/list.model';
import { Lists } from '../../singletons/lists';

@IonicPage()
@Component({
    selector: 'page-admin-lists',
    templateUrl: 'admin-lists.html'
})
export class AdminListsPage {
    // displayed while loading the lists
    loader: Loading;
    // Forms
    createForm: FormGroup;
    // lists
    previousLists: Array<ListM> = [];

    constructor(
        public navCtrl: NavController,
        public lists: Lists,
        private storage: Storage,
        private formBuilder: FormBuilder,
        private loadingCtrl: LoadingController
    ) {}

    // Angular Lifecycle

    /**
     * Create the `FormBuilder` for this view and each `FormControl` with its owns `Validators`.
     */
    ngOnInit() {
        this.createForm = this.formBuilder.group({
            listName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)]))
        });
    }

    // Ionic Lifecycle

    /**
     * Load the previously stored lists when this page is loaded.
     */
    ionViewDidLoad() {
        this.loader = this.loadingCtrl.create({
            content: 'Loading...'
        });
        this.loader.present();

        this.storage
            .forEach((list: ListM) => {
                if (list.hasOwnProperty('products') && list.paid) {
                    this.lists.paid.unshift(list);
                } else if (list.hasOwnProperty('products') && !list.paid) {
                    this.lists.unpaid.unshift(list);
                }
            })
            .then(() => {
                console.info('paid:/', this.lists.paid);
                console.info('unpaid:/', this.lists.unpaid);
                this.loader.dismiss();
            });
    }

    // User Interaction

    /**
     * Get the name for the new Create a new `ListM`, store it in the `storage` and take the user to the `ListDetailPage` page.
     */
    didPressCreate(): void {
        let name: string = this.createForm.controls['listName'].value;

        this.lists.createList(name).then((list: ListM) => {
            this.createForm.controls['listName'].reset();
            this.navCtrl.push('ListDetailPage', { list: list });
        });
    }

    /**
     * Send the selected `ListM` to be modified.
     * @param list.
     */
    didPressList(list: ListM): void {
        this.navCtrl.push('ListDetailPage', { list: list });
    }
}
