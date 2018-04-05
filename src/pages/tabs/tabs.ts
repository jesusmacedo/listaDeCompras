import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    tab1Root: string = 'AdminListsPage';
    tab2Root: string = 'PreviousListsPage';
    tab3Root: string = 'AdminCategoriesPage';

    constructor() {}
}
