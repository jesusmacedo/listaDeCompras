import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

import { NewPage } from '../pages/new/new';
import { PreviousPage } from '../pages/previous/previous';
import { CategoriesPage } from '../pages/categories/categories';
import { TabsPage } from '../pages/tabs/tabs';
import { ListPage } from '../pages/list/list';
import { AddItemPage } from '../pages/add-item/add-item';
import { AddCategoryPage } from '../pages/add-category/add-category';

@NgModule({
    declarations: [MyApp, NewPage, PreviousPage, CategoriesPage, TabsPage, ListPage, AddItemPage, AddCategoryPage],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, { tabsHideOnSubPages: true }),
        IonicStorageModule.forRoot({
            name: '__listaCompras',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [MyApp, NewPage, PreviousPage, CategoriesPage, TabsPage, ListPage, AddItemPage, AddCategoryPage],
    providers: [StatusBar, SplashScreen, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule {}
