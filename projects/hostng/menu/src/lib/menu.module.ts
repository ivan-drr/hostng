import { ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { HtMenuRoutingModule } from './menu-routing.module';
import { DataViewModule } from 'primeng/dataview';
import { TabMenuModule } from 'primeng/tabmenu';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

import { HtMenuComponent } from './menu.component';
import { SummarizeTextPipe } from './summarize-text.pipe';
import { HtProductCardComponent } from './product-card/product-card.component';
import { HtRationProductComponent } from './ration-product/ration-product.component';
import { HtUniqueProductComponent } from './unique-product/unique-product.component';
import { FirebaseOptions } from '@angular/fire/app';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HtMenuRoutingModule,
    DataViewModule,
    TabMenuModule,
    DialogModule,
    CardModule,
    ImageModule,
    ButtonModule,
    InputNumberModule
  ],
  declarations: [
    HtMenuComponent,
    SummarizeTextPipe,
    HtProductCardComponent,
    HtRationProductComponent,
    HtUniqueProductComponent
  ],
  bootstrap: [HtMenuComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HtMenuModule {
  public static forRoot(firebaseConfig: FirebaseOptions): ModuleWithProviders<HtMenuModule> {

    return {
      ngModule: HtMenuModule,
      providers: [
        {
          provide: FIREBASE_OPTIONS,
          useValue: firebaseConfig
        }
      ]
    };
  }
}
