import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { AlertsService } from '../../../../../services/alerts/alerts.service';
import { ProductsService } from '../../../services/products/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  private productId: string;

  public product$: any = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertsService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params.id;

      this.productsService.getProductById(this.productId).subscribe(
        (res: any) => {
          this.product$.next(res);
        },
        (err) => {
          this.alertService.showAlertDanger(err.error.errors[0]);
        }
      );
    });
  }

  onSubmit(data) {
    this.productsService.updateProduct(this.productId, data).subscribe(
      (res) => {
        this.router.navigate(['backoffice', 'products']);
      },
      (err) => {
        this.alertService.showAlertDanger(err.error.errors[0]);
      }
    );
  }
}
