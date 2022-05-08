import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from '@hostng/models'; 
import { ServingSize } from '@hostng/models';
import { ShoppingCartService } from '@hostng/services';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'ht-ration-product',
  templateUrl: './ration-product.component.html'
})
export class HtRationProductComponent implements OnInit {

  @Input('product') product!: Product;
  @Input('show') show!: boolean;
  @Output() showRationChanged: EventEmitter<boolean> = new EventEmitter();
  rationOptions: any;
  ration: any = 'one';
  quantity: any = 1;
  imageUrl!: any;

  constructor(private shoppingCart: ShoppingCartService, private afStorage: AngularFireStorage) { }

  ngOnInit() {
    this.afStorage.ref(`/products/${this.product.name}.png`).getDownloadURL().subscribe(url => this.imageUrl = url);
    this.rationOptions = [
      { id: 'tapa', name: ServingSize.Tapa, disabled: this.product?.portions[0].price === -1 },
      { id: 'half', name: ServingSize.Half, disabled: this.product?.portions[1].price === -1 },
      { id: 'one', name: ServingSize.One, disabled: this.product?.portions[2].price === -1 }
    ];
  }

  handleHide(): void {
    this.showRationChanged.emit(false);
  }

  handleOptionClick(event: any) {
    this.ration = event.option.id;
  }

  handleBuy() {
    this.shoppingCart.addRationProduct(this.product, this.ration, this.quantity);
    this.handleHide();
  }

  getRationPrice(): string {
    return this.shoppingCart.getPriceFromPortion(this.product, this.ration) * this.quantity + '€'
  }

}
