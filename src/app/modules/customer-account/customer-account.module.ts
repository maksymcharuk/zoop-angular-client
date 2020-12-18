import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { CustomerAccountRoutingModule } from './customer-account-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { CustomerAccountComponent } from './customer-account.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [CustomerAccountComponent, DashboardComponent],
  imports: [
    BrowserModule,
    CustomerAccountRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ChartsModule,
    SharedModule,
  ],
  providers: [],
})
export class CustomerAccountModule {}
