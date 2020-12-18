import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertsService } from '../../../../services/alerts/alerts.service';
import { ProductsService } from '../../../../services/products/products.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
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
        this.alertService.showAlertDanger(err.error.errors[0]);
      }
    );
  }
}
