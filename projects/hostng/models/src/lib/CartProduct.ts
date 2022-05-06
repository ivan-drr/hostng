export class CartProduct {
    constructor(public name: string, public price: number, public quantity: number) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}
