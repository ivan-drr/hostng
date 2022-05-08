import { Category } from './Category';
import { Portion } from './Portion';

export class Product {
    constructor(public name: string, public price: number, public description: string, public category: Category, public portions: Portion[], public available: boolean) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
        this.portions = portions;
        this.available = available;
    }
}
