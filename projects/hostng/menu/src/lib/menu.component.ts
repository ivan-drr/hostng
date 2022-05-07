import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Product } from '@hostng/models';
import { DataView } from 'primeng/dataview';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'ht-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: []
})
export class HtMenuComponent implements OnInit, OnDestroy {

  paramSubscription!: Subscription;
  rid!: string;
  @ViewChild('dataView') dataView!: DataView;

  showUniqueProduct: boolean = false;
  showRationProduct: boolean = false;

  productSubscription!: Subscription;
  categorySubscription!: Subscription;
  products!: any;
  currentProduct!: Product;

  categories!: MenuItem[];
  selectedCategory: any;

  constructor(private activatedroute: ActivatedRoute, private afStore: AngularFirestore) { }

  ngOnInit(): void {
    this.subscribeToParams();
    this.subscribeToProducts();
    this.subscribeToCategories();

    this.initCategories()
    this.selectedCategory = this.categories[0].label;
  }

  ngOnDestroy(): void {
    this.disrupSubscription(this.paramSubscription);
    this.disrupSubscription(this.productSubscription);
    this.disrupSubscription(this.categorySubscription);
  }

  subscribeToParams(): void {
    this.paramSubscription = this.activatedroute.data
      .subscribe(data => this.rid = data['rid']);
    this.paramSubscription.closed = false;
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
      .subscribe(data => {
        const afCategories = data
          .map((c) => {
            return {
              label: c['name'],
              command: () => this.dataView.filter(c['name'])
            }
          });
        this.initCategories(afCategories);
      });
    this.categorySubscription.closed = false;
  }

  disrupSubscription(sub: Subscription): boolean {
    if (!sub) return false;
    sub.unsubscribe();
    sub.closed = true;
    return sub.closed;
  }

  initCategories(data?: MenuItem[]): void {
    this.categories = [{ label: 'Todo', command: () => this.dataView.filter('') }];

    if (!data) return;
    data.forEach((i) => this.categories.push(i));
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
