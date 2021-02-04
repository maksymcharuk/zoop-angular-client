import { Component, OnInit } from '@angular/core';

import { CatalogProduct } from '../../interfaces';
import { CatalogService } from '../../services/catalog/catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public products: CatalogProduct[] = [];
  public loading = true;

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.catalogService
      .getProducts()
      .subscribe((products: CatalogProduct[]) => {
        this.products = products;
        this.loading = false;
      });
  }
}
