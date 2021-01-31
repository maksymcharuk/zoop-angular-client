import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { OrderProduct } from '../../interfaces/order-product.inteface';
import { UpsertOrderProduct } from '../../interfaces/upsert-order-product.interface';
import { Cart } from '../../interfaces/cart.interface';

import { LocalStorageService } from '../../../../shared/services/local-storage/local-storage.service';
import { TokenService } from '../../../../shared/services/token/token.service';
import { UserService } from '../../../../shared/services/user/user.service';
import { OrderCalculationsService } from '../order-calculations/order-calculations.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public intialCart = {
    products: [],
    totalPrice: 0
  } as Cart;
  public cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.intialCart);

  private guestCartKey = 'guestCart';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private tokenService: TokenService,
    private userService: UserService,
    private orderCalculationsService: OrderCalculationsService
  ) {
    this.getCart().subscribe((cart: Cart) => {
      this.cart$.next(cart);
    });
    this.tokenService.userIsSiggnedIn$.subscribe((userIsSiggnedIn: boolean) => {
      if (!userIsSiggnedIn) {
        this.clearCart();
        this.localStorage.removeItem(this.guestCartKey);
      }
    });
  }

  public addToCart(orderProduct: OrderProduct): Observable<Cart> {
    return new Observable(subscriber => {
      if (this.userService.isSignedIn()) {
        this.addToCartServer(orderProduct).subscribe((cart: Cart) => {
          this.localStorage.setItem(this.guestCartKey, cart);
          this.cart$.next(cart);
          subscriber.next(cart);
          subscriber.complete();
        });
      } else {
        const cart = this.cart$.getValue();
        const products = cart.products;

        this.upsert(products, orderProduct);

        this.orderCalculationsService
          .getTotalPrice(products)
          .subscribe(totalPrice => {
            const newCart: Cart = { ...cart, products, totalPrice };
            this.localStorage.setItem(this.guestCartKey, newCart);
            this.cart$.next(newCart);
            subscriber.next(newCart);
            subscriber.complete();
          });
      }
    });
  }

  public removeFromCart(orderProduct: OrderProduct): Observable<Cart> {
    return new Observable(subscriber => {
      if (this.userService.isSignedIn()) {
        this.removeFromCartServer(orderProduct.product._id).subscribe(
          (cart: Cart) => {
            this.localStorage.setItem(this.guestCartKey, cart);
            this.cart$.next(cart);
            subscriber.next(cart);
            subscriber.complete();
          }
        );
      } else {
        const cart = this.cart$.getValue();
        const products = cart.products.filter(
          (p: OrderProduct) => p.product._id !== orderProduct.product._id
        );
        const newCart = { ...cart, products };
        this.localStorage.setItem(this.guestCartKey, newCart);
        this.cart$.next(newCart);
        subscriber.next(newCart);
        subscriber.complete();
      }
    });
  }

  private getCart(): Observable<Cart> {
    const guestCart =
      this.localStorage.getItem(this.guestCartKey) || this.intialCart;

    return new Observable(subscriber => {
      if (this.userService.isSignedIn()) {
        this.http.get<Cart>('/cart').subscribe((cart: Cart) => {
          subscriber.next(cart);
        });
      } else {
        subscriber.next(guestCart);
        subscriber.complete();
      }
    });
  }

  public clearCart(): void {
    this.cart$.next(this.intialCart);
  }

  public fullfillCartOnLogin(): Observable<Cart> {
    const guestCart = this.localStorage.getItem(this.guestCartKey);

    return new Observable(subscriber => {
      if (guestCart) {
        return this.http.put('/cart', guestCart).subscribe((cart: Cart) => {
          this.localStorage.removeItem(this.guestCartKey);
          this.cart$.next(cart);
          subscriber.next(cart);
          subscriber.complete();
        });
      } else {
        subscriber.next();
        subscriber.complete();
      }
    });
  }

  private addToCartServer(orderProduct: OrderProduct): Observable<Cart> {
    return this.http.post<Cart>('/cart', orderProduct);
  }

  private removeFromCartServer(orderProductId: string): Observable<Cart> {
    return this.http.delete<Cart>('/cart', { params: { orderProductId } });
  }

  private upsert(array: OrderProduct[], item: OrderProduct): void {
    const i = array.findIndex(_item => _item.product._id === item.product._id);
    if (i > -1) {
      array[i] = item;
    } else {
      array.push(item);
    }
  }
}
