import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HtMenuComponent } from './menu.component';

const routes: Routes = [
  {path: '', component: HtMenuComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HtMenuRoutingModule { }
