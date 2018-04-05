import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddItemToListPage } from './add-item-to-list';

@NgModule({
    declarations: [AddItemToListPage],
    imports: [IonicPageModule.forChild(AddItemToListPage)]
})
export class AddItemToListPageModule {}
