import { Injectable, ElementRef, ComponentRef } from '@angular/core';
import { DOMService } from '../dom/dom.service';
import { LoaderComponent } from '../../components/loader/loader.component';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor(private dom: DOMService) {}

  showLoader(container?: ElementRef, params?: any): void {
    this.dom.appendComponent(LoaderComponent, params, container);
  }

  hideLoader(loader: ComponentRef<LoaderComponent>): void {
    this.dom.removeComponent(loader);
  }
}
