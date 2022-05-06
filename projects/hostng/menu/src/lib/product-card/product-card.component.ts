import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Product } from '@hostng/models';

@Component({
  selector: 'ht-card-product',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class HtProductCardComponent implements OnInit {

  @Input() product!: Product;
  productImg!: string;
  currentRation!: boolean;

  constructor(private afStorage: AngularFireStorage) { }

  ngOnInit() {
    this.afStorage.ref(`/products/${this.product.name}.png`).getDownloadURL();
  }

  getPrice() {
    let result: any = '';
    if (this.product.portions.length > 0) result = this.product.portions[2].price
    else result = this.product.price;

    return result + '€';
  }

}
