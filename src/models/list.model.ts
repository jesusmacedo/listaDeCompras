import { ProductM } from "./product.model";

export class ListM {
    id: number = 0;
    name: string;
    products: Array<ProductM> = [];
    total: number = 0.0;
    paid: boolean = false;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
