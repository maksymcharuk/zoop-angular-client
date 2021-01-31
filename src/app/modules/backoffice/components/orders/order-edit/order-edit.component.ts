import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { AlertsService } from '../../../../../shared/services/alerts/alerts.service';
import { OrdersService } from '../../../services/orders/orders.service';

@Component({
  selector: 'backoffice-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss'],
})
export class OrderEditComponent implements OnInit {
  private orderId: string;

  public order$: any = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderId = params.id;

      this.ordersService.getOrderById(this.orderId).subscribe(
        (res: any) => {
          this.order$.next(res);
        },
        (err) => {
          this.alertService.showAlertDanger(err.message);
        }
      );
    });
  }

  onSubmit(data): void {
    this.ordersService.updateOrder(this.orderId, data).subscribe(
      (res) => {
        this.router.navigate(['backoffice', 'orders']);
      },
      (err) => {
        this.alertService.showAlertDanger(err.message);
      }
    );
  }
}
