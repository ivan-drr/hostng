import { Injectable } from '@angular/core';
import { CartProduct } from '@hostng/models'; 
import { Product } from '@hostng/models'; 
import { ServingSize } from '@hostng/models'; 

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private products: CartProduct[] = [];

  getProducts() {
    return this.products;
  }

  addRationProduct(product: Product, portion: ServingSize, quantity: number) {
    const productName = `${this.getPortionByName(portion)} ${product.name}`;
    let exist = false;
    this.products.forEach((cartProduct) => {
      if(cartProduct.name == productName) {
        exist = true;
        cartProduct.quantity += quantity;
        return;
      } 
    });
    
    if (!exist) this.products.push(new CartProduct(productName, this.getPriceFromPortion(product, portion), quantity));
  }

  addUniqueProduct(product: Product, quantity: number) {
    let exist = false;
    this.products.forEach((cartProduct) => {
      if(cartProduct.name == product.name) {
        exist = true;
        cartProduct.quantity += quantity;
        return;
      } 
    });
    
    if (!exist) this.products.push(new CartProduct(product.name, product.price, quantity));
  }

  removeProduct(productName: string): void {
    const filtered = this.products.filter((cartProduct) => (cartProduct.name != productName));
    this.products = filtered.slice();
  }

  addQuantity(productName: string) {
    this.getProductByName(productName).quantity++;
  }

  removeQuantity(productName: string) {
    const product =this.getProductByName(productName);

    if(product.quantity <= 1) return;
    product.quantity--;
  }

  getTotalPrice(): number {
    let total = 0;
    this.products.forEach((p) => total += p.price * p.quantity);

    return total
  }

  getPriceFromPortion(product: Product, portion: ServingSize): number {
    const price = Object.values(product.portions).find((p) => p.name === portion)?.price;
    if (!price) throw new Error("Price could not be found for one of your products in your cart");

    return price;
  }

  private getProductByName(productName: string): CartProduct {
    const product = this.products.find((cartProduct) => (cartProduct.name === productName));
    if (!product) throw new Error("No product found with name: " + productName);

    return product;
  }

  private getPortionByName(portion: string): ServingSize {
    if (portion === 'tapa') return ServingSize.Tapa;
    else if (portion === 'half') return ServingSize.Half;
    else return ServingSize.One;
  }
}
