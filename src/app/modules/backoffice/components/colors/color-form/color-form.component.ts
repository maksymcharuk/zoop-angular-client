import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Status } from 'src/app/enums';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { FormDataUtils } from 'src/app/shared/utils';
import { ColorsService } from '../../../services/colors/colors.service';

@Component({
  selector: 'backoffice-color-form',
  templateUrl: './color-form.component.html',
  styleUrls: ['./color-form.component.scss']
})
export class ColorFormComponent implements OnInit {
  @Input() color;

  @Output() save: EventEmitter<any> = new EventEmitter();

  public colorForm: FormGroup;
  public colorsService$ = this.colorsService.getColors();

  constructor(
    private fb: FormBuilder,
    private colorsService: ColorsService,
    private alertsService: AlertsService
  ) {}

  ngOnInit(): void {
    this.colorForm = this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required]
    });

    if (this.color) {
      this.colorForm.patchValue(this.color);
      this.colorForm.get('status');
    }
  }

  onSubmit(): void {
    if (!this.colorForm.valid) {
      this.alertsService.showAlertDanger('Some required fields are missing');
      return;
    }

    const formData = {
      name: this.colorForm.get('name').value,
      value: this.colorForm.get('value').value
    };

    this.save.emit(formData);
  }
}
