import { Component, OnInit } from '@angular/core';

import { Product } from '../../../../interfaces';
import { OrderProduct, CatalogProduct } from '../../interfaces';

import { ProductsService } from '../../../../shared/services/products/products.service';
import { CartService } from '../../services/cart/cart.service';
import { CatalogService } from '../../services/catalog/catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
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
  }
}
