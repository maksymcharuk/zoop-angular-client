import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../../../../interfaces';
import { CatalogProduct, OrderProduct } from '../../interfaces';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: CatalogProduct;

  public loading = false;
  public primaryProduct: Product;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.primaryProduct = this.getPrimaryProduct();
  }

  addToCart(product: Product): void {
    this.loading = true;
    const orderProduct: OrderProduct = { product, quantity: 1 };
    this.cartService.addToCart(orderProduct).subscribe(() => {
      this.loading = false;
    });
  }

  removeFromCart(product: Product): void {
    this.loading = true;
    const orderProduct: OrderProduct = { product, quantity: 1 };
    this.cartService.removeFromCart(orderProduct).subscribe(() => {
      this.loading = false;
    });
  }

  getPrimaryProduct(): Product {
    return this.product.products[0];
  }
}
