import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { SellerComponent } from './seller.component';
import {TreeComponent} from './tree/tree.component';
import {CategoryComponent} from './category/category.component';
import {DetailComponent} from './tree/detail/detail.component';
import {CreateComponent} from './tree/create/create.component';
import {EditTreeComponent} from './tree/edit-tree/edit-tree.component';


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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
