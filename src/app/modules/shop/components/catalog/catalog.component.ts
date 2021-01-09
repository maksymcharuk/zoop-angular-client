import { Component, OnInit } from '@angular/core';
import { mergeMap, map } from 'rxjs/operators';

import { Product } from '../../../../interfaces';
import { OrderProduct, Cart } from '../../interfaces';

import { ProductsService } from '../../../../shared/services/products/products.service';
import { CartService } from './../../services/cart/cart.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  public products: OrderProduct[];
  public loading = true;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productsService
      .getProducts()
      .pipe(
        mergeMap((products: Product[]) => {
          return this.cartService.cart$.pipe(
            map((cart: Cart) => {
              return products.map((product: Product) => {
                const p = cart.products.find(
                  (p) => product._id === p.product._id
                );
                return {
                  product: p ? p.product : product,
                  quantity: p ? p.quantity : 0,
                };
              });
            })
          );
        })
      )
      .subscribe((products: OrderProduct[]) => {
        this.products = products;
        this.loading = false;
      });
  }

  addToCart(orderProduct: OrderProduct) {
    this.loading = true;
    this.cartService.addToCart(orderProduct).subscribe(() => {
      this.loading = false;
    });
  }

  removeFromCart(orderProduct: OrderProduct) {
    this.loading = true;
    this.cartService.removeFromCart(orderProduct.product._id).subscribe(() => {
      this.loading = false;
    });
  }
}
