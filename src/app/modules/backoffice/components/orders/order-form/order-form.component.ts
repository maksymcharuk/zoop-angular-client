import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { OrderProduct } from '../../../../../interfaces';
import { AlertsService } from '../../../../../shared/services/alerts/alerts.service';
import { OrdersService } from '../../../services/orders/orders.service';

@Component({
  selector: 'backoffice-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  @Input() order;

  @Output() save: EventEmitter<any> = new EventEmitter();

  public orderForm: FormGroup;
  public deliveryTypes = [
    { label: 'Pickup', value: 'pickup' },
    { label: 'Nova Poshta', value: 'novaposhta' }
  ];

  public products: OrderProduct[];
  public loading = true;

  constructor(
    private fb: FormBuilder,
    private alertsService: AlertsService,
    private orderService: OrdersService
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      recieverDetails: this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]]
      }),
      deliveryDetails: this.fb.group({
        type: [this.deliveryTypes[0].value, [Validators.required]],
        address: '',
        city: '',
        state: '',
        details: ''
      })
    });

    if (this.order) {
      this.orderForm.patchValue(this.order);
    }
  }

  onSubmit(): void {
    if (!this.orderForm.valid) {
      this.alertsService.showAlertDanger('Some required fields are missing');
      return;
    }

    this.loading = true;

    const order = {
      ...this.orderForm.value,
      products: this.products.map(p => ({
        product: p.product._id,
        quantity: p.quantity
      }))
    };

    this.orderService.createOrder(order).subscribe(() => {
      this.loading = false;
    });
  }
}
