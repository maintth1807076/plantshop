import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  {
    path: '',
    loadChildren: () => import('./outsite/outsite.module').then(m => m.OutsiteModule),
  },
  {
    path: '',
    loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
