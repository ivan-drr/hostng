import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { HtMenuRoutingModule } from './menu-routing.module';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { TabMenuModule } from 'primeng/tabmenu';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
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
    FormsModule,
    DataViewModule,
    TabMenuModule,
    DialogModule,
    CardModule,
    ImageModule,
    ButtonModule,
    SelectButtonModule,
    InputNumberModule
  ],
  declarations: [
    HtMenuComponent,
    SummarizeTextPipe,
    HtProductCardComponent,
    HtRationProductComponent,
    HtUniqueProductComponent
  ],
  bootstrap: [HtMenuComponent]
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
