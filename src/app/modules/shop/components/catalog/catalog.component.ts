import { Component, OnInit } from '@angular/core';

import { Product } from '../../../../interfaces';
import { OrderProduct, CatalogProduct } from '../../interfaces';

import { ProductsService } from '../../../../shared/services/products/products.service';
import { CartService } from '../../services/cart/cart.service';
import { CatalogService } from '../../services/catalog/catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  // public products: OrderProduct[];
  public products: CatalogProduct[];
  public loading = true;

  constructor(
    private productsService: ProductsService,
    private catalogService: CatalogService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.catalogService
      .getProducts()
      .subscribe((products: CatalogProduct[]) => {
        this.products = products;
        this.loading = false;
      });

    // this.productsService
    //   .getProducts()
    //   .pipe(
    //     mergeMap((products: Product[]) => {
    //       return this.cartService.cart$.pipe(
    //         map((cart: Cart) => {
    //           return products.map((product: Product) => {
    //             const p = cart.products.find(
    //               (p) => product._id === p.product._id
    //             );
    //             return {
    //               product: p ? p.product : product,
    //               quantity: p ? p.quantity : 0,
    //             };
    //           });
    //         })
    //       );
    //     })
    //   )
    //   .subscribe((products: OrderProduct[]) => {
    //     this.products = products;
    //     this.loading = false;
    //   });
  }

  addToCart(product: Product) {
    this.loading = true;
    const orderProduct: OrderProduct = { product, quantity: 1 };
    this.cartService.addToCart(orderProduct).subscribe(() => {
      this.loading = false;
    });
  }

  removeFromCart(product: Product) {
    this.loading = true;
    const orderProduct: OrderProduct = { product, quantity: 1 };
    this.cartService.removeFromCart(orderProduct).subscribe(() => {
      this.loading = false;
    });
  }
}
