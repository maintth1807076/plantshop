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
import { EditTreeComponent } from './tree/edit-tree/edit-tree.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { DetailCategoryComponent } from './category/detail-category/detail-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';

@NgModule({
  declarations: [ManageComponent, TreeComponent, CategoryComponent, DetailComponent, CreateComponent, EditTreeComponent, CreateCategoryComponent, DetailCategoryComponent, EditCategoryComponent],
  imports: [
    CommonModule,
    SellerRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class SellerModule { }
