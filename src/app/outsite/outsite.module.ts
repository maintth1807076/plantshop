import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutsiteRoutingModule } from './outsite-routing.module';
import { HomeComponent } from './home/home.component';
import { OutsiteComponent } from './outsite.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { ShopComponent } from './shop/shop.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopSellerComponent } from './shop-seller/shop-seller.component';
import { ProductModalComponent } from './product-modal/product-modal.component';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [OutsiteComponent, HomeComponent, AboutComponent, ContactComponent, BlogComponent, BlogDetailsComponent, ShopComponent, ShopDetailsComponent, PortfolioComponent, ShopCartComponent, CheckoutComponent, ShopSellerComponent, ProductModalComponent],
  imports: [
    CommonModule,
    OutsiteRoutingModule,
    NgxPaginationModule
  ]
})
export class OutsiteModule { }
