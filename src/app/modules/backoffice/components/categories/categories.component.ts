import { Component, OnInit } from '@angular/core';

import { CategoriesService } from '../../services/categories/categories.service';

@Component({
  selector: 'backoffice-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  public categories: any[];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  deleteCategory(id: string) {
    this.categoriesService.removeCategory(id).subscribe(() => {
      this.categories = this.categories.filter(
        (category) => category._id !== id
      );
    });
  }
}
