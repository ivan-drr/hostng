import { ServingSize } from "./ServingSize";

export class Portion {
    constructor(public name: ServingSize, public price: number) {
        this.name = name;
        this.price = price
    }
}