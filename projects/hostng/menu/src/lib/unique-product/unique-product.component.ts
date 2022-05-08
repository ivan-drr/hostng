import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
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
  imageUrl!: any;

  constructor(private shoppingCart: ShoppingCartService, private afStorage: AngularFireStorage) { }

  ngOnInit() {
    this.afStorage.ref(`/products/${this.product.name}.png`).getDownloadURL().subscribe(url => this.imageUrl = url);
  }

  handleHide(): void {
    this.showUniqueChanged.emit(false);
  }

  handleBuy() {
    this.shoppingCart.addUniqueProduct(this.product, this.quantity);
    this.handleHide();
  }

}
