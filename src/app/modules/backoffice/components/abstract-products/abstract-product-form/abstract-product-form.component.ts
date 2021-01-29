import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Status } from '../../../../../enums';
import { CategoriesService } from '../../../services/categories/categories.service';

@Component({
  selector: 'backoffice-abstract-product-form',
  templateUrl: './abstract-product-form.component.html',
  styleUrls: ['./abstract-product-form.component.scss'],
})
export class AbstractProductFormComponent implements OnInit {
  @Input() abstractProduct;

  @Output() save: EventEmitter<any> = new EventEmitter();

  public abstractProductForm: FormGroup;
  public categories$ = this.categoriesService.getCategories();

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.abstractProductForm = this.fb.group({
      name: ['', Validators.required],
      category: [''],
      status: [''],
    });

    if (this.abstractProduct) {
      this.abstractProductForm.patchValue(this.abstractProduct);
      this.abstractProductForm
        .get('status')
        .patchValue(this.abstractProduct.status === Status.Active);
      this.abstractProductForm
        .get('category')
        .patchValue(this.abstractProduct.category._id);
    }
  }

  onSubmit() {
    if (!this.abstractProductForm.valid) {
      return;
    }

    this.save.emit({
      name: this.abstractProductForm.get('name').value,
      category: this.abstractProductForm.get('category').value,
      status: this.abstractProductForm.get('status').value
        ? Status.Active
        : Status.Inactive,
    });
  }
}
