import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { BackofficeComponent } from './backoffice.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AbstractProductsComponent } from './components/abstract-products/abstract-products.component';
import { AbstractProductCreateComponent } from './components/abstract-products/abstract-product-create/abstract-product-create.component';
import { AbstractProductEditComponent } from './components/abstract-products/abstract-product-edit/abstract-product-edit.component';
import { AbstractProductFormComponent } from './components/abstract-products/abstract-product-form/abstract-product-form.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductCreateComponent } from './components/products/product-create/product-create.component';
import { ProductEditComponent } from './components/products/product-edit/product-edit.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryCreateComponent } from './components/categories/category-create/category-create.component';
import { CategoryEditComponent } from './components/categories/category-edit/category-edit.component';
import { CategoryFormComponent } from './components/categories/category-form/category-form.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderCreateComponent } from './components/orders/order-create/order-create.component';
import { OrderFormComponent } from './components/orders/order-form/order-form.component';
import { СustomersComponent } from './components/customers/customers.component';
import { CustomerCreateComponent } from './components/customers/customer-create/customer-create.component';
import { CustomerFormComponent } from './components/customers/customer-form/customer-form.component';
import { AccountComponent } from './components/account/account.component';

@NgModule({
  declarations: [
    BackofficeComponent,
    DashboardComponent,
    AbstractProductsComponent,
    AbstractProductCreateComponent,
    AbstractProductEditComponent,
    AbstractProductFormComponent,
    ProductsComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductFormComponent,
    CategoriesComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    CategoryFormComponent,
    OrdersComponent,
    OrderCreateComponent,
    OrderFormComponent,
    СustomersComponent,
    CustomerCreateComponent,
    CustomerFormComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    BackofficeRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ChartsModule,
    SharedModule,
  ],
  providers: [],
})
export class BackofficeModule {}
