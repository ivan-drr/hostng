import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { Product } from '@hostng/models';
import { DataView } from 'primeng/dataview';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'ht-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class HtMenuComponent implements OnInit, OnDestroy {

  @Input('rid') rid!: string;
  @ViewChild('dataView') dataView!: DataView;

  showUniqueProduct: boolean = false;
  showRationProduct: boolean = false;

  productSubscription!: Subscription;
  categorySubscription!: Subscription;
  products!: any;
  currentProduct!: Product;

  categories!: MenuItem[];
  selectedCategory: any;

  constructor(private afStore: AngularFirestore) { }

  ngOnInit(): void {
    this.subscribeToProducts();
    this.subscribeToCategories();

    this.selectedCategory = this.categories[0].label;
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
    this.productSubscription.closed = true;

    this.categorySubscription.unsubscribe();
    this.categorySubscription.closed = true;
  }

  subscribeToProducts(): void {
    if (!this.rid) return;
    const productRef = this.afStore
      .collection("restaurants")
      .doc(this.rid)
      .collection("products");

    this.productSubscription = productRef
      .valueChanges()
      .subscribe(data => this.products = data);

    this.productSubscription.closed = false;
  }

  subscribeToCategories(): void {
    if (!this.rid) return;
    const productRef = this.afStore
      .collection("restaurants")
      .doc(this.rid)
      .collection("categories");

    this.categorySubscription = productRef
      .valueChanges()
      .subscribe(data => this.categories = data
        .map((c) => {
          return {
            label: c['name'],
            command: () => this.dataView.filter(c['name'])
          }
        }));
    this.categorySubscription.closed = false;
  }

  handleCardClick(product: Product) {
    if (!product) return;
    this.currentProduct = product;

    if (this.currentProduct.portions.length > 0) this.showRationProduct = true;
    else this.showUniqueProduct = true;
  }

  showUniqueChangedHandler(show: boolean) {
    this.showUniqueProduct = show;
  }

  showRationChangedHandler(show: boolean) {
    this.showRationProduct = show;
  }
}
