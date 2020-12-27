import { Component, OnInit } from '@angular/core';

import { CartProduct } from '../../interfaces/cart-product.inteface';

import { UserService } from '../../../../shared/services/user/user.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isUserSeller = this.userService.isSeller();
  public isUserSignedIn = this.userService.isSignedIn();
  public isUserSignedOut = this.userService.isSignedOut();
  public cartProducts: CartProduct[] = [];

  constructor(
    private userService: UserService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.products$.subscribe((products: CartProduct[]) => {
      this.cartProducts = products;
    });
  }
}
