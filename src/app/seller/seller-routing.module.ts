import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { SellerComponent } from './seller.component';


const routes: Routes = [
  {
    path: 'seller',
    component: SellerComponent,

    children: [
      {
        path: 'manage', 
        component: ManageComponent, 
      },
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
