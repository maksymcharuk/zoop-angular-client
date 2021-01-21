import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertsService } from '../../../../../shared/services/alerts/alerts.service';
import { AbstractProductsService } from '../../../services/abstract-products/abstract-products.service';

@Component({
  selector: 'app-abstract-product-create',
  templateUrl: './abstract-product-create.component.html',
  styleUrls: ['./abstract-product-create.component.scss'],
})
export class AbstractProductCreateComponent implements OnInit {
  constructor(
    private router: Router,
    private alertService: AlertsService,
    private abstractProductsService: AbstractProductsService
  ) {}

  ngOnInit(): void {}

  onSubmit(data) {
    this.abstractProductsService.create(data).subscribe(
      (res) => {
        this.router.navigate(['backoffice', 'abstract-products']);
      },
      (err) => {
        this.alertService.showAlertDanger(err.message);
      }
    );
  }
}
