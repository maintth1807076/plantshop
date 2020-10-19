import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OutsiteComponent} from './outsite.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {ShopComponent} from './shop/shop.component';
import {ShopDetailsComponent} from './shop-details/shop-details.component';
import {ShopCartComponent} from './shop-cart/shop-cart.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {PortfolioComponent} from './portfolio/portfolio.component';
import {BlogComponent} from './blog/blog.component';
import {BlogDetailsComponent} from './blog-details/blog-details.component';
import {ShopSellerComponent} from './shop-seller/shop-seller.component';
import {ProductModalComponent} from './product-modal/product-modal.component';
import {UserComponent} from './user/user.component';
import {ManageOrderComponent} from './user/manage-order/manage-order.component';
import {ProfileUserComponent} from './user/profile-user/profile-user.component';
import {NotificationUserComponent} from './user/notification-user/notification-user.component';
import {WishlistComponent} from './user/wishlist/wishlist.component';
import {PayComponent} from './pay/pay.component';
import {SellerComponent} from './seller/seller.component';
import {TreeComponent} from './seller/tree/tree.component';
import { CreateComponent } from './seller/tree/create/create.component';
import {DetailComponent} from './seller/tree/detail/detail.component';
import {EditComponent} from './seller/tree/edit/edit.component';
import {CategoryComponent} from './seller/category/category.component';
import {CreateCategoryComponent} from './seller/category/create-category/create-category.component';
import {DetailCategoryComponent} from './seller/category/detail-category/detail-category.component';
import {EditCategoryComponent} from './seller/category/edit-category/edit-category.component';
import {ProfileSellerComponent} from './seller/profile-seller/profile-seller.component';

const routes: Routes = [
  {
    path: '',
    component: OutsiteComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,

        children: [
          {
            path: 'product-modal',
            component: ProductModalComponent,
          },

        ],
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'shop',
        component: ShopComponent,

      },
      {
        path: 'shop-details/:id',
        component: ShopDetailsComponent
      },
      {
        path: 'shop-cart',
        component: ShopCartComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      },
      {
        path: 'pay',
        component: PayComponent,
      },
      {
        path: 'portfolio',
        component: PortfolioComponent
      },
      {
        path: 'blog',
        component: BlogComponent
      },
      {
        path: 'blog-details',
        component: BlogDetailsComponent
      },
      {
        path: 'shop-seller',
        component: ShopSellerComponent
      },
      {
        path: 'seller',
        component: SellerComponent,

        children: [
          {
            path: 'profile',
            component: ProfileSellerComponent,
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
            component: EditComponent,
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
      {
        path: 'user',
        component: UserComponent,
        children: [
          {
            path: 'order',
            component: ManageOrderComponent
          },
          {
            path: 'profile',
            component: ProfileUserComponent
          },
          {
            path: 'notification',
            component: NotificationUserComponent
          },
          {
            path: 'wishlist',
            component: WishlistComponent
          },
        ],
      },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutsiteRoutingModule {
}
