import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { SellerComponent } from './seller.component';
import {TreeComponent} from './tree/tree.component';
import {CategoryComponent} from './category/category.component';
import {DetailComponent} from './tree/detail/detail.component';
import {CreateComponent} from './tree/create/create.component';
import {EditTreeComponent} from './tree/edit-tree/edit-tree.component';
import {CreateCategoryComponent} from './category/create-category/create-category.component';
import {DetailCategoryComponent} from './category/detail-category/detail-category.component';
import {EditCategoryComponent} from './category/edit-category/edit-category.component';


const routes: Routes = [
  {
    path: 'seller',
    component: SellerComponent,

    children: [
      {
        path: 'manage',
        component: ManageComponent,
      },
      {
        path: 'tree',
        component: TreeComponent,
      },
      {
        path: 'tree/create',
        component: CreateComponent,
      },
      {
        path: 'tree/detail/:id',
        component: DetailComponent,
      },
      {
        path: 'tree/edit/:id',
        component: EditTreeComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
      {
        path: 'category/create',
        component: CreateCategoryComponent,
      },
      {
        path: 'category/detail/:id',
        component: DetailCategoryComponent,
      },
      {
        path: 'category/edit/:id',
        component: EditCategoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
