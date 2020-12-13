import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../interfaces';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  public products$: Observable<Product[]> = this.productService.getProducts();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}
}
