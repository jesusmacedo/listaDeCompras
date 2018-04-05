import { ProductCategoryM } from './product-category.model';

export class ProductM {
    name: string;
    category: ProductCategoryM;
    price: number = 0.0;
    numberOfItems: number = 1;

    constructor(name: string, price: number, numberOfItems: number, category?: ProductCategoryM) {
        this.name = name;
        this.price = price;
        this.numberOfItems = numberOfItems;
        this.category = category;
    }
}
