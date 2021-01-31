import { Component, OnInit } from '@angular/core';

import { AlertsService } from '../../shared/services/alerts/alerts.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  constructor(private alertService: AlertsService) {}

  ngOnInit(): void {
    if (history.state.data && history.state.data.alertMessage) {
      this.alertService.showAlertSuccess(history.state.data.alertMessage);
    }
  }
}
