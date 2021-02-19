import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs/operators';

import { Product } from '../../../../interfaces';
import { CatalogProduct, OrderProduct } from '../../interfaces';
import { CatalogService } from '../../services/catalog/catalog.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public code: string;
  public product: CatalogProduct;
  public primaryProduct: Product;
  public loading = false;

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        flatMap(params => {
          this.code = params.code;
          return this.catalogService.getProductByCode(params.code);
        })
      )
      .subscribe(product => {
        this.product = product;
        this.primaryProduct = this.getPrimaryProduct();
      });
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
    return this.product.products.find(p => p.code === this.code);
  }
}
