import { ProductCategoryM } from './product-category.model';

/**
 * Definition of the `ProductM`.
 */
export class ProductM {
    id: number = 0;
    name: string;
    category: ProductCategoryM;
    price: number = 0.0;
    numberOfItems: number = 1;

    /**
     * Create a new instance of `ProductM`.
     * @param id unique.
     * @param name alphanumeric.
     * @param price numeric.
     * @param numberOfItems numeric.
     * @param category `ProductCategoryM`.
     */
    constructor(id: number, name: string, price: number, numberOfItems: number, category?: ProductCategoryM) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.numberOfItems = numberOfItems;
        this.category = category;
    }
}
