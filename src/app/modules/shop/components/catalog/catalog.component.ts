import { Component, OnInit } from '@angular/core';
import { mergeMap, map } from 'rxjs/operators';

import { Product } from '../../../../interfaces';

import { ProductsService } from '../../../../shared/services/products/products.service';
import { CartProduct } from '../../interfaces/cart-product.inteface';
import { CartService } from './../../services/cart/cart.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  public products: CartProduct[];

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productsService
      .getProducts()
      .pipe(
        mergeMap((products: Product[]) => {
          return this.cartService.products$.pipe(
            map((cartProducts: CartProduct[]) => {
              return products.map((product: Product) => {
                const p = cartProducts.find(
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
      .subscribe((products: CartProduct[]) => {
        this.products = products;
      });
  }

  addToCart(cartProduct: CartProduct) {
    this.cartService.add(cartProduct);
  }

  removeFromCart(cartProduct: CartProduct) {
    this.cartService.remove(cartProduct.product);
  }
}
