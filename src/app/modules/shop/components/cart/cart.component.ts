import { Component, OnInit } from '@angular/core';

import { Cart } from '../../interfaces/cart.interface';
import { OrderProduct } from '../../interfaces/order-product.inteface';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public cart: Cart;
  public products: OrderProduct[];
  public loading = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loading = true;
    this.cartService.cart$.subscribe((cart: Cart) => {
      this.cart = cart;
      this.products = cart.products;
      this.loading = false;
    });
  }

  addToCart(cartProduct: OrderProduct): void {
    this.loading = true;

    this.cartService.addToCart(cartProduct).subscribe(() => {
      this.loading = false;
    });
  }

  removeFromCart(cartProduct: OrderProduct): void {
    this.loading = true;

    this.cartService.removeFromCart(cartProduct).subscribe(() => {
      this.loading = false;
    });
  }
}
