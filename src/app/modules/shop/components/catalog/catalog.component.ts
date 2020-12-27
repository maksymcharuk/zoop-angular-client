import { Component, OnInit } from '@angular/core';

import { Product } from '../../../../interfaces';

import { ProductsService } from '../../../../shared/services/products/products.service';
import { CartService } from './../../services/cart/cart.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  public products: any[];

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  addToCart(product: Product, quantity: number) {
    this.cartService.add({ product, quantity });
  }

  removeFromCart(product: Product) {
    this.cartService.remove(product);
  }
}
