import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { StaticRoutingModule } from './static-routing.module';

import { StaticComponent } from './static.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInSellerComponent } from './components/sign-in-seller/sign-in-seller.component';
import { CatalogComponent } from './components/catalog/catalog.component';

@NgModule({
  declarations: [
    StaticComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    SignInSellerComponent,
    CatalogComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    StaticRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class StaticModule {}
