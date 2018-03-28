import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ListPage } from '../list/list';
import { ListM } from '../../models/list.model';

@Component({
    selector: 'page-new',
    templateUrl: 'new.html'
})
export class NewPage implements OnInit {
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
        this.storage.get('lists').then((lists:Array<ListM>) => {
            console.info('lists?', lists);
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

    didPressCreate(): void {
        let name: string = this.createForm.controls['listName'].value;

        this.navCtrl.push(ListPage, { name: name });
    }
}
