import { Injectable } from '@angular/core';

declare let gtag: (type, name, data) => void;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  constructor() {}

  public eventEmitter(
    eventName: string,
    eventCategory: string,
    eventLabel: string = null,
    eventValue: number = null
  ): void {
    gtag('event', eventName, {
      event_category: eventCategory,
      event_label: eventLabel,
      value: eventValue
    });
  }
}
