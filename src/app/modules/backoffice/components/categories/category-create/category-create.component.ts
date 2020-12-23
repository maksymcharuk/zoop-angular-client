import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from '../../../../../services/alerts/alerts.service';
import { CategoriesService } from '../../../services/categories/categories.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss'],
})
export class CategoryCreateComponent implements OnInit {
  constructor(
    private router: Router,
    private alertService: AlertsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {}

  onSubmit(data) {
    this.categoriesService.createCategory(data).subscribe(
      (res) => {
        this.router.navigate(['backoffice', 'categories']);
      },
      (err) => {
        this.alertService.showAlertDanger(err.error.errors[0]);
      }
    );
  }
}
