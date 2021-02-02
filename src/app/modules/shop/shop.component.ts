import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { AlertsService } from '../../shared/services/alerts/alerts.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShopComponent implements OnInit {
  public isHomePage = false;

  constructor(private router: Router, private alertService: AlertsService) {}

  ngOnInit(): void {
    if (history.state.data && history.state.data.alertMessage) {
      this.alertService.showAlertSuccess(history.state.data.alertMessage);
    }
  }
}
