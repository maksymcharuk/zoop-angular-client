import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertsService } from '../../../../../shared/services/alerts/alerts.service';
import { OrdersService } from '../../../services/orders/orders.service';

@Component({
  selector: 'backoffice-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit {
  constructor(
    private router: Router,
    private alertService: AlertsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {}

  onSubmit(data): void {
    this.ordersService.createOrder(data).subscribe(
      res => {
        this.router.navigate(['backoffice', 'orders']);
      },
      err => {
        this.alertService.showAlertDanger(err.message);
      }
    );
  }
}
