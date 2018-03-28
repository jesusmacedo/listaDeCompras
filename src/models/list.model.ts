import { ProductM } from "./product.model";

export class ListM {
    id: number = 0;
    name: string;
    products: { [x: string]: ProductM };
    total: number = 0.0;
    paid: boolean = false;
}
