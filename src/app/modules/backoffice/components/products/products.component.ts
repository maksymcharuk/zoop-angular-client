import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlertsService } from '../../../../shared/services/alerts/alerts.service';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public products: any[];

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  deleteProduct(id: string) {
    this.productsService.removeProduct(id).subscribe(() => {
      this.products = this.products.filter((product) => product._id !== id);
    });
  }
}
