import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../services/alerts/alerts.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss'],
})
export class StaticComponent implements OnInit {
  public isUserSeller = this.userService.isSeller();
  public isUserSignedIn = this.userService.isSignedIn();
  public isUserSignedOut = this.userService.isSignedOut();

  constructor(
    private userService: UserService,
    private alertService: AlertsService
  ) {}

  ngOnInit(): void {
    if (history.state.data && history.state.data.alertMessage) {
      this.alertService.showAlertSuccess(history.state.data.alertMessage);
    }
  }
}
