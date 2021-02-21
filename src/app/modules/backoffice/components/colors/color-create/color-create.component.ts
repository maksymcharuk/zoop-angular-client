import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { ColorsService } from '../../../services/colors/colors.service';

@Component({
  selector: 'app-color-create',
  templateUrl: './color-create.component.html',
  styleUrls: ['./color-create.component.scss']
})
export class ColorCreateComponent implements OnInit {
  constructor(
    private router: Router,
    private alertService: AlertsService,
    private colorsService: ColorsService
  ) {}

  ngOnInit(): void {}

  onSubmit(data): void {
    this.colorsService.createColor(data).subscribe(
      res => {
        this.router.navigate(['backoffice', 'colors']);
      },
      err => {
        this.alertService.showAlertDanger(err.message);
      }
    );
  }
}
