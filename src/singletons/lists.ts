import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs';

import { ListM } from '../models/list.model';

const SUCCESSFUL_CREATION: string = 'The list was saved.';
const SUCCESSFUL_UPDATE: string = 'The list was updated.';

/**
 * `singleton` for handling a `ListM` array globally.
 */
@Injectable()
export class Lists {
    unpaid: Array<ListM> = [];
    paid: Array<ListM> = [];

    constructor(private storage: Storage, private toastCrtl: ToastController) {}

    /**
     * Create a new `ListM` and store it in the `storage`.
     * @param name.
     */
    createList(name: string): Promise<ListM> {
        let time: number = new Date().getTime();
        let list: ListM = new ListM(name, time);

        return this.storage.set(`${list.date}`, list).then(() => {
            this.unpaid.unshift(list);
            this.displayToast(SUCCESSFUL_CREATION);
            return list;
        });
    }

    /**
     * Update the received `ListM` in the `storage`.
     * @param list sent from `ListDetailPage`.
     */
    updateList(list: ListM): void {
        this.storage.set(`${list.date}`, list).then(() => {
            this.displayToast(SUCCESSFUL_UPDATE);
        });
    }

    // Private Methods

    /**
     * Display a `ToastController` with the received message.
     * @param message error.
     */
    private displayToast(message: string): void {
        let toast = this.toastCrtl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });

        toast.present();
    }
}
