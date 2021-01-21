import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from '../../guards/authentication/authentication.guard';

import { BackofficeComponent } from './backoffice.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductCreateComponent } from './components/products/product-create/product-create.component';
import { ProductEditComponent } from './components/products/product-edit/product-edit.component';
import { AbstractProductsComponent } from './components/abstract-products/abstract-products.component';
import { AbstractProductCreateComponent } from './components/abstract-products/abstract-product-create/abstract-product-create.component';
import { AbstractProductEditComponent } from './components/abstract-products/abstract-product-edit/abstract-product-edit.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryCreateComponent } from './components/categories/category-create/category-create.component';
import { CategoryEditComponent } from './components/categories/category-edit/category-edit.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderCreateComponent } from './components/orders/order-create/order-create.component';
import { СustomersComponent } from './components/customers/customers.component';
import { CustomerCreateComponent } from './components/customers/customer-create/customer-create.component';
import { AccountComponent } from './components/account/account.component';

const routes: Routes = [
  {
    path: 'backoffice',
    component: BackofficeComponent,
    canActivate: [AuthenticationGuard],
    data: { seller: true },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/create', component: ProductCreateComponent },
      { path: 'products/edit/:id', component: ProductEditComponent },
      { path: 'abstract-products', component: AbstractProductsComponent },
      {
        path: 'abstract-products/create',
        component: AbstractProductCreateComponent,
      },
      {
        path: 'abstract-products/edit/:id',
        component: AbstractProductEditComponent,
      },
      { path: 'categories', component: CategoriesComponent },
      { path: 'categories/create', component: CategoryCreateComponent },
      { path: 'categories/edit/:id', component: CategoryEditComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'orders/create', component: OrderCreateComponent },
      { path: 'customers', component: СustomersComponent },
      { path: 'customers/create', component: CustomerCreateComponent },
      { path: 'account', component: AccountComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackofficeRoutingModule {}
