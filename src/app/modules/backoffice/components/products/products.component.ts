import { Component, OnInit } from '@angular/core';

import { AlertsService } from '../../../../shared/services/alerts/alerts.service';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'backoffice-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public products: any[];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  deleteProduct(id: string): void {
    this.productsService.removeProduct(id).subscribe(() => {
      this.products = this.products.filter((product) => product._id !== id);
    });
  }
}
