import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { ColorsService } from '../../../services/colors/colors.service';

@Component({
  selector: 'app-color-edit',
  templateUrl: './color-edit.component.html',
  styleUrls: ['./color-edit.component.scss']
})
export class ColorEditComponent implements OnInit {
  private colorId: string;

  public color$: any = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertsService,
    private colorsService: ColorsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.colorId = params.id;

      this.colorsService.getColorById(this.colorId).subscribe(
        (res: any) => {
          this.color$.next(res);
        },
        err => {
          this.alertService.showAlertDanger(err.message);
        }
      );
    });
  }

  onSubmit(data): void {
    this.colorsService.updateColor(this.colorId, data).subscribe(
      res => {
        this.router.navigate(['backoffice', 'colors']);
      },
      err => {
        this.alertService.showAlertDanger(err.error.message);
      }
    );
  }
}
