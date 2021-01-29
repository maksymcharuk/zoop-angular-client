import { Component, OnInit } from '@angular/core';

import { AlertsService } from '../../../../shared/services/alerts/alerts.service';
import { OrdersService } from '../../services/orders/orders.service';

@Component({
  selector: 'backoffice-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  public orders: any[];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  deleteProduct(id: string) {
    this.ordersService.removeOrder(id).subscribe(() => {
      this.orders = this.orders.filter((product) => product._id !== id);
    });
  }
}
