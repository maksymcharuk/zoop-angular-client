import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { OrderProduct } from '../../interfaces/order-product.inteface';
import { Cart } from '../../interfaces/cart.interface';

import { UserService } from '../../../../shared/services/user/user.service';
import { CartService } from '../../services/cart/cart.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isUserSeller = this.userService.isSeller();
  public isUserSignedIn = this.userService.isSignedIn();
  public isUserSignedOut = this.userService.isSignedOut();
  public cartProducts: OrderProduct[] = [];

  private onDestroy$ = new Subject();

  constructor(
    private userService: UserService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.cart$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((cart: Cart) => {
        this.cartProducts = cart.products;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
