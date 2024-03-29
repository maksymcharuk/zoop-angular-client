import { Injectable, ComponentRef } from '@angular/core';
import { DOMService } from '../dom/dom.service';
import { AlertComponent } from '../../components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  constructor(private dom: DOMService) {}

  showAlertSuccess(text, params?): void {
    this.showAlert({ type: 'success', text, ...params });
  }

  showAlertDanger(text, params?): void {
    this.showAlert({ type: 'danger', text, ...params });
  }

  showAlert(params): ComponentRef<AlertComponent> {
    let alert: ComponentRef<AlertComponent>;

    alert = this.dom.appendComponent(AlertComponent, {
      selfClosing: true,
      dismissible: true,
      ...params
    });

    alert.instance.closeEm.subscribe(() => {
      this.dom.removeComponent(alert);
    });

    return alert;
  }

  closeAlert(alert: ComponentRef<AlertComponent>): void {
    alert.instance.close();
  }
}
