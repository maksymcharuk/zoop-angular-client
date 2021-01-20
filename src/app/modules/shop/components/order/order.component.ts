import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Cart } from '../../interfaces/cart.interface';
import { OrderProduct } from '../../interfaces/order-product.inteface';
import { CartService } from '../../services/cart/cart.service';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  public orderForm: FormGroup;
  public deliveryTypes = [
    { label: 'Pickup', value: 'pickup' },
    { label: 'Nova Poshta', value: 'novaposhta' },
  ];

  public cart: Cart;
  public products: OrderProduct[];
  public loading = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.cartService.cart$.subscribe((cart: Cart) => {
      this.cart = cart;
      this.products = cart.products;
      this.loading = false;
    });

    this.orderForm = this.fb.group({
      recieverDetails: this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
      }),
      deliveryDetails: this.fb.group({
        type: [this.deliveryTypes[0].value, [Validators.required]],
        address: '',
        city: '',
        state: '',
        details: '',
      }),
    });
  }

  onSubmit() {
    this.loading = true;

    const order = {
      ...this.orderForm.value,
      products: this.products.map((p) => ({
        product: p.product._id,
        quantity: p.quantity,
      })),
    };

    this.orderService.create(order).subscribe(() => {
      this.loading = false;
    });
  }
}
