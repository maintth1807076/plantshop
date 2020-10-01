import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [ManageComponent],
  imports: [
    CommonModule,
    SellerRoutingModule
  ]
})
export class SellerModule { }
