import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Status } from './../../../enums';
import { CategoriesService } from './../../../services/categories/categories.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  @Input() product;

  @Output() save: EventEmitter<any> = new EventEmitter();

  public productForm: FormGroup;
  public categories$ = this.categoriesService.getCategories();

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      shortDescription: [''],
      description: [''],
      category: [''],
      imageUrl: [''],
      stringId: [''],
      color: [''],
      height: [''],
      width: [''],
      weight: [''],
      status: [''],
    });

    if (this.product) {
      this.productForm.patchValue(this.product);
      this.productForm
        .get('status')
        .patchValue(this.product.status === Status.Active);
      this.productForm.get('category').patchValue(this.product.category._id);
    }
  }

  onSubmit() {
    if (!this.productForm.valid) {
      return;
    }

    this.save.emit({
      name: this.productForm.get('name').value,
      price: this.productForm.get('price').value,
      shortDescription: this.productForm.get('shortDescription').value,
      description: this.productForm.get('description').value,
      category: this.productForm.get('category').value,
      imageUrl: this.productForm.get('imageUrl').value,
      stringId: this.productForm.get('stringId').value,
      color: this.productForm.get('color').value,
      height: this.productForm.get('height').value,
      width: this.productForm.get('width').value,
      weight: this.productForm.get('weight').value,
      status: this.productForm.get('status').value
        ? Status.Active
        : Status.Inactive,
    });
  }
}