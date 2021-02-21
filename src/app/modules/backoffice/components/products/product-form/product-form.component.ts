import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ChangeDetectorRef
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FormDataUtils } from './../../../../../shared/utils';
import { Status } from '../../../../../enums';
import { AbstractProductsService } from './../../../services/abstract-products/abstract-products.service';
import { AlertsService } from './../../../../../shared/services/alerts/alerts.service';
import { ColorsService } from '../../../services/colors/colors.service';

@Component({
  selector: 'backoffice-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() product;

  @Output() save: EventEmitter<any> = new EventEmitter();

  public productForm: FormGroup;
  public abstractProducts$ = this.abstractProductsService.getAll();
  public colors$ = this.colorsService.getColors();

  private primaryImage;

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private abstractProductsService: AbstractProductsService,
    private alertsService: AlertsService,
    private colorsService: ColorsService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
      shortDescription: [''],
      description: [''],
      abstractProduct: ['', Validators.required],
      stringId: ['', Validators.required],
      color: [''],
      height: [''],
      width: [''],
      weight: [''],
      status: ['']
    });

    if (this.product) {
      this.productForm.patchValue(this.product);
      this.productForm
        .get('status')
        .patchValue(this.product.status === Status.Active);
      this.productForm
        .get('abstractProduct')
        .patchValue(this.product.abstractProduct._id);
      this.productForm.get('color').patchValue(this.product.color._id);
    }
  }

  onPrimaryImageChange(files: FileList): void {
    this.primaryImage = files[0];
  }

  onSubmit(): void {
    if (!this.productForm.valid) {
      this.alertsService.showAlertDanger('Some required fields are missing');
      return;
    }

    const formData = FormDataUtils.objToFormData({
      code: this.productForm.get('code').value,
      name: this.productForm.get('name').value,
      price: this.productForm.get('price').value,
      primaryImage: this.primaryImage,
      shortDescription: this.productForm.get('shortDescription').value,
      description: this.productForm.get('description').value,
      abstractProduct: this.productForm.get('abstractProduct').value,
      stringId: this.productForm.get('stringId').value,
      color: this.productForm.get('color').value,
      height: this.productForm.get('height').value,
      width: this.productForm.get('width').value,
      weight: this.productForm.get('weight').value,
      status: this.productForm.get('status').value
        ? Status.Active
        : Status.Inactive
    });

    this.save.emit(formData);
  }
}
