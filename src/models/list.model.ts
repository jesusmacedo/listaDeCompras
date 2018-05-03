import { ProductM } from "./product.model";

/**
 * Definition of the `ListM` object.
 */
export class ListM {
    date: number = 0;
    name: string;
    products: Array<ProductM> = [];
    total: number = 0.0;
    paid: boolean = false;

    /**
     * Create a new `ListM`.
     * @param name for the new list.
     * @param date created at.
     */
    constructor(name: string, date?: number) {
        this.name = name;
        this.date = date;
    }
}
