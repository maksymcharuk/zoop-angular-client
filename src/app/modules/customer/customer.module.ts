import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, CustomerRoutingModule],
})
export class CustomerModule {}
