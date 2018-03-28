import { Component } from '@angular/core';

import { NewPage } from '../new/new';
import { PreviousPage } from '../previous/previous';
import { CategoriesPage } from '../categories/categories';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    tab1Root = NewPage;
    tab2Root = PreviousPage;
    tab3Root = CategoriesPage;

    constructor() {}
}
