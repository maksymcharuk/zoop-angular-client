import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { AlertsService } from '../../../../../services/alerts/alerts.service';
import { CategoriesService } from '../../../services/categories/categories.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss'],
})
export class CategoryEditComponent implements OnInit {
  private categoryId: string;

  public category$: any = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = params.id;

      this.categoriesService.getCategoryById(this.categoryId).subscribe(
        (res: any) => {
          this.category$.next(res);
        },
        (err: HttpErrorResponse) => {
          this.alertService.showAlertDanger(err.error.message);
        }
      );
    });
  }

  onSubmit(data) {
    this.categoriesService.updateCategory(this.categoryId, data).subscribe(
      (res) => {
        this.router.navigate(['backoffice', 'categories']);
      },
      (err: HttpErrorResponse) => {
        this.alertService.showAlertDanger(err.error.message);
      }
    );
  }
}
