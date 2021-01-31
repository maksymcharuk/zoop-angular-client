import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Status } from '../../../../../enums';
import { CategoriesService } from '../../../services/categories/categories.service';
import { Category } from '../../../interfaces';
import { map } from 'rxjs/operators';

@Component({
  selector: 'backoffice-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  @Input() category: Category = {} as Category;

  @Output() save: EventEmitter<any> = new EventEmitter();

  public categoryForm: FormGroup;
  public categories: Category[];

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      parentCategory: [''],
      status: [''],
    });

    if (this.category) {
      this.categoryForm.patchValue(this.category);
      this.categoryForm
        .get('status')
        .patchValue(this.category.status === Status.Active);
      if (this.category.parentCategory) {
        this.categoryForm
          .get('parentCategory')
          .patchValue(this.category.parentCategory._id);
      }
    }

    this.categoriesService
      .getSuitableParents(this.category._id)
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  onSubmit(): void {
    if (!this.categoryForm.valid) {
      return;
    }

    this.save.emit(
      this.clean({
        name: this.categoryForm.get('name').value,
        description: this.categoryForm.get('description').value,
        parentCategory: this.categoryForm.get('parentCategory').value,
        status: this.categoryForm.get('status').value
          ? Status.Active
          : Status.Inactive,
      })
    );
  }

  clean(obj: {}): {} {
    for (const propName in obj) {
      if (!obj[propName]) {
        delete obj[propName];
      }
    }

    return obj;
  }
}
