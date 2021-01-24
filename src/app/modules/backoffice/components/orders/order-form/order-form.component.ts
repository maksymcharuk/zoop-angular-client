import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { CustomersService } from '../../../services/customers/customers.service';
import { ProductsService } from '../../../../../shared/services/products/products.service';

@Component({
  selector: 'backoffice-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  @Input() order;

  @Output() save: EventEmitter<any> = new EventEmitter();

  public orderForm: FormGroup;
  public customers$: Observable<any> = this.customersService.getCustomers();
  public products$: BehaviorSubject<any> = new BehaviorSubject([]);

  private shopId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private customersService: CustomersService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.parent.params.subscribe((params) => {
      this.shopId = +params.id;
      this.productsService.getProducts().subscribe((data) => {
        this.products$.next(data);
      });
    });

    this.orderForm = this.fb.group({
      status: ['', Validators.required],
      customerId: ['', Validators.required],
      products: [[], Validators.required],
    });

    if (this.order) {
      this.orderForm.patchValue(this.order);
    }
  }

  get statusCtrl() {
    return this.orderForm.get('status');
  }

  get customerIdCtrl() {
    return this.orderForm.get('customerId');
  }

  get productsCtrl() {
    return this.orderForm.get('products');
  }

  onSubmit() {
    if (!this.orderForm.valid) {
      return;
    }

    this.save.emit({
      status: this.statusCtrl.value,
      customerId: this.customerIdCtrl.value,
      products: this.productsCtrl.value.join(','),
    });
  }
}
