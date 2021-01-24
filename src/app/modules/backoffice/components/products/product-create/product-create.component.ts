import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from '../../../../../shared/services/alerts/alerts.service';
import { ProductsService } from '../../../services/products/products.service';

@Component({
  selector: 'backoffice-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnInit {
  constructor(
    private router: Router,
    private alertService: AlertsService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {}

  onSubmit(data) {
    this.productsService.createProduct(data).subscribe(
      (res) => {
        this.router.navigate(['backoffice', 'products']);
      },
      (err) => {
        this.alertService.showAlertDanger(err.message);
      }
    );
  }
}
