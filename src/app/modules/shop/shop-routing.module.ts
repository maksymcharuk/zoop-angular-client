import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './shop.component';
import { HomeComponent } from './components/home/home.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInSellerComponent } from './components/sign-in-seller/sign-in-seller.component';

import { IsSignedOutGuard } from '../../guards/is-signed-out/is-signed-out.guard';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'catalog',
        component: CatalogComponent,
        data: {
          breadcrumb: 'Каталог'
        }
      },
      { path: 'products/:code', component: ProductComponent },
      { path: 'cart', component: CartComponent },
      { path: 'order', component: OrderComponent },
      {
        path: 'sign-in',
        component: SignInComponent,
        canActivate: [IsSignedOutGuard]
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        canActivate: [IsSignedOutGuard]
      },
      {
        path: 'sign-in-seller',
        component: SignInSellerComponent,
        canActivate: [IsSignedOutGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {}
