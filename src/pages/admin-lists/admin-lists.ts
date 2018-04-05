import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ListM } from '../../models/list.model';

@IonicPage()
@Component({
    selector: 'page-admin-lists',
    templateUrl: 'admin-lists.html'
})
export class AdminListsPage {
    // lists
    lists: Array<ListM> = [];
    unfinished: Array<ListM> = [];
    // Forms
    createForm: FormGroup;
    // lists
    previousLists: Array<ListM> = [];

    constructor(public navCtrl: NavController, private storage: Storage, private formBuilder: FormBuilder) {}

    // Ionic Lifecycle

    /**
     * Load the previously stored lists when this page is loaded.
     */
    ionViewDidLoad() {
        this.storage.get('lists').then((lists: Array<ListM>) => {
            console.info('lists?', lists);
            if (lists !== null) {
                this.lists = lists;

                for (const list of lists) {
                    if (!list.paid) {
                        this.unfinished.unshift(list);
                    }
                }
            }
        });
    }

    // Angular Lifecycle

    /**
     * Create the `FormBuilder` for this view and each `FormControl` with its owns `Validators`.
     */
    ngOnInit() {
        this.createForm = this.formBuilder.group({
            listName: new FormControl('', Validators.compose([Validators.required]))
        });
    }

    // User Interaction

    /**
     * Create a new list item and append it to the current lists.
     */
    didPressCreate(): void {
        let name: string = this.createForm.controls['listName'].value;
        let newList: ListM = new ListM(this.lists.length, name);

        this.lists.unshift(newList);
        this.storage.set('lists', this.lists).then(() => {
            this.navCtrl.push('ListDetailPage', { list: newList });
        });
    }

    /**
     * Send the selected list to be modified.
     * @param list.
     */
    didPressList(list: ListM): void {
        this.navCtrl.push('ListDetailPage', { list: list, allLists: this.lists });
    }
}
