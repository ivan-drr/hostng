import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtMenuRoutingModule } from './menu-routing.module';
import { DataViewModule } from 'primeng/dataview';
import { TabMenuModule } from 'primeng/tabmenu';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

import { HtMenuComponent } from './menu.component'; 
import { SummarizeTextPipe } from './summarize-text.pipe';
import { HtProductCardComponent } from '../public-api';
import { HtRationProductComponent } from '../public-api';
import { HtUniqueProductComponent } from '../public-api';

@NgModule({
  imports: [
    CommonModule,
    HtMenuRoutingModule,
    DataViewModule,
    TabMenuModule,
    DialogModule,
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
export class HtMenuModule { }
