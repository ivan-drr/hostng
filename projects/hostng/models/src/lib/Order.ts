import { CartProduct } from "./CartProduct";

export interface Order {
    id: string,
    table: number;
    time: {
        hours: number,
        minutes: number,
        seconds: number
    };
    products: CartProduct[];
    price: number;
    served: boolean;
    payed: boolean;
    empty: boolean;
    requireCardLector: boolean;
}
