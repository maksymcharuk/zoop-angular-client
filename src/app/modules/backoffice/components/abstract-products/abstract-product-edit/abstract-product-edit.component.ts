import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { AlertsService } from '../../../../../shared/services/alerts/alerts.service';
import { AbstractProductsService } from '../../../services/abstract-products/abstract-products.service';

@Component({
  selector: 'app-abstract-product-edit',
  templateUrl: './abstract-product-edit.component.html',
  styleUrls: ['./abstract-product-edit.component.scss'],
})
export class AbstractProductEditComponent implements OnInit {
  private abstractProductId: string;

  public abstractProduct$: any = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertsService,
    private abstractProductsService: AbstractProductsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.abstractProductId = params.id;

      this.abstractProductsService.getById(this.abstractProductId).subscribe(
        (res: any) => {
          this.abstractProduct$.next(res);
        },
        (err) => {
          this.alertService.showAlertDanger(err.message);
        }
      );
    });
  }

  onSubmit(data): void {
    this.abstractProductsService.update(this.abstractProductId, data).subscribe(
      (res) => {
        this.router.navigate(['backoffice', 'abstract-products']);
      },
      (err) => {
        this.alertService.showAlertDanger(err.message);
      }
    );
  }
}
