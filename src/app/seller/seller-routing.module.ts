import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { SellerComponent } from './seller.component';
import {TreeComponent} from './tree/tree.component';
import {CategoryComponent} from './category/category.component';
import {CreateEditComponent} from './tree/create-edit/create-edit.component';
import {DetailComponent} from './tree/detail/detail.component';
import {CreateComponent} from './tree/create/create.component';
import {EditComponent} from './tree/edit/edit.component';


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
        path: 'tree/edit',
        component: EditComponent,
      },
      {
        path: 'tree/:id',
        component: DetailComponent,
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
