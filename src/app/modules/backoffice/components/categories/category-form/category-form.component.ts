import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Status } from './../../../enums';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  @Input() category;

  @Output() save: EventEmitter<any> = new EventEmitter();

  public categoryForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      shortDescription: [''],
      description: [''],
      imageUrl: [''],
      stringId: [''],
      color: [''],
      height: [''],
      width: [''],
      weight: [''],
      status: [''],
    });

    if (this.category) {
      this.categoryForm.patchValue(this.category);
      this.categoryForm
        .get('status')
        .patchValue(this.category.status === Status.Active);
    }
  }

  onSubmit() {
    if (!this.categoryForm.valid) {
      return;
    }

    this.save.emit({
      name: this.categoryForm.get('name').value,
      description: this.categoryForm.get('description').value,
      status: this.categoryForm.get('status').value
        ? Status.Active
        : Status.Inactive,
    });
  }
}
