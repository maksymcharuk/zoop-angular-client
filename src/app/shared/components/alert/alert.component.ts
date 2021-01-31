import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AlertComponent implements OnInit {
  private _closed = false;
  private timeout = 5000;

  @Input() selfClosing: boolean;
  @Input() dismissible: boolean;
  @Input() type: string;
  @Input() text: string;
  @Input()
  set closed(value) {
    this._closed = value;
    value ? this.closeEm.emit() : this.openEm.emit();
  }

  get closed(): boolean {
    return this._closed;
  }

  @Output() openEm: EventEmitter<any> = new EventEmitter();
  @Output() closeEm: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    if (this.selfClosing) {
      setTimeout(() => {
        this.close();
      }, this.timeout);
    }
  }

  open(): void {
    this.closed = false;
  }

  close(): void {
    this.closed = true;
  }
}
