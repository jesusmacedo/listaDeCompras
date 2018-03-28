import { ProductCategoryM } from './product-category.model';

export class ProductM {
    name: string;
    category: ProductCategoryM;
    price: number = 0.0;
    numberOfItems: number = 1;

    constructor(name: string, category: ProductCategoryM, price: number, numberOfItems: number) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.numberOfItems = numberOfItems;
    }
}
