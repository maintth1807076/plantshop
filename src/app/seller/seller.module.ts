import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { ManageComponent } from './manage/manage.component';
import { TreeComponent } from './tree/tree.component';
import { CategoryComponent } from './category/category.component';
import { DetailComponent } from './tree/detail/detail.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import { CreateComponent } from './tree/create/create.component';


@NgModule({
  declarations: [ManageComponent, TreeComponent, CategoryComponent, DetailComponent, CreateComponent],
  imports: [
    CommonModule,
    SellerRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class SellerModule { }
