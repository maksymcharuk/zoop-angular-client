import { Component, OnInit } from '@angular/core';
import { mergeMap, map } from 'rxjs/operators';

import { Product } from '../../../../interfaces';

import { ProductsService } from '../../../../shared/services/products/products.service';
import { CartProduct } from '../../interfaces/cart-product.inteface';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public products: CartProduct[];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.products$.subscribe((products: CartProduct[]) => {
      this.products = products;
    });
  }

  removeFromCart(cartProduct: CartProduct) {
    this.products = this.products.filter(
      (p) => p.product._id !== cartProduct.product._id
    );
    this.cartService.remove(cartProduct.product);
  }
}
