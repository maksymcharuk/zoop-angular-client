import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { ShopRoutingModule } from './shop-routing.module';

import { ShopComponent } from './shop.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

import { HomeComponent } from './components/home/home.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInSellerComponent } from './components/sign-in-seller/sign-in-seller.component';

import { ProductItemComponent } from './components/product-item/product-item.component';

@NgModule({
  declarations: [
    ShopComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    HomeComponent,
    CatalogComponent,
    CartComponent,
    OrderComponent,
    SignInComponent,
    SignUpComponent,
    SignInSellerComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ShopRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: []
})
export class ShopModule {}
