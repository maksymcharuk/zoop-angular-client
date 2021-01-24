import { Component, OnInit } from '@angular/core';

import { AbstractProductsService } from './../../services/abstract-products/abstract-products.service';

@Component({
  selector: 'backoffice-abstract-products',
  templateUrl: './abstract-products.component.html',
  styleUrls: ['./abstract-products.component.scss'],
})
export class AbstractProductsComponent implements OnInit {
  public abstractProducts: any[];

  constructor(private abstractProductsService: AbstractProductsService) {}

  ngOnInit(): void {
    this.abstractProductsService.getAll().subscribe((products) => {
      this.abstractProducts = products;
    });
  }

  deleteProduct(id: string) {
    this.abstractProductsService.remove(id).subscribe(() => {
      this.abstractProducts = this.abstractProducts.filter(
        (product) => product._id !== id
      );
    });
  }
}
