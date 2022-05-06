import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@hostng/models'; 
import { ShoppingCartService } from '@hostng/services';

@Component({
  selector: 'ht-unique-product',
  templateUrl: './unique-product.component.html'
})
export class HtUniqueProductComponent {

  @Input('product') product!: Product;
  @Input('show') show!: boolean;
  @Output() showUniqueChanged: EventEmitter<boolean> =   new EventEmitter();
  quantity: any = 1;

  constructor(private shoppingCart: ShoppingCartService) { }

  handleHide(): void {
    this.showUniqueChanged.emit(false);
  }

  handleBuy() {
    this.shoppingCart.addUniqueProduct(this.product, this.quantity);
    this.handleHide();
  }

}
