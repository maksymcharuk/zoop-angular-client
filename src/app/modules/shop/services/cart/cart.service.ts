import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Product } from '../../../../interfaces';
import { OrderProduct } from '../../interfaces/order-product.inteface';
import { UpsertOrderProduct } from './../../interfaces/upsert-order-product.interface';
import { Cart } from './../../interfaces/cart.interface';

import { LocalStorageService } from '../../../../shared/services/local-storage/local-storage.service';
import { UserService } from '../../../../shared/services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cart$: BehaviorSubject<Cart> = new BehaviorSubject({
    products: [],
  } as Cart);

  private cardProductsKey = 'cartProducts';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {
    this.getCart().subscribe((cart: Cart) => {
      this.cart$.next(cart);
    });
  }

  public addToCart(product: OrderProduct): Observable<Cart> {
    const cart = this.cart$.getValue();
    const products = this.cart$.getValue().products;
    this.upsert(products, product);

    return new Observable((subscriber) => {
      if (this.userService.isSignedIn()) {
        this.addToCartServer({
          product: product.product._id,
          quantity: product.quantity,
        }).subscribe((cart: Cart) => {
          this.localStorageService.setItem(this.cardProductsKey, products);
          this.cart$.next(cart);
          subscriber.next(cart);
          subscriber.complete();
        });
      } else {
        const newCart = { ...cart, products };
        this.localStorageService.setItem(this.cardProductsKey, products);
        this.cart$.next(newCart);
        subscriber.next(newCart);
        subscriber.complete();
      }
    });
  }

  public removeFromCart(orderProductId: string): Observable<Cart> {
    const cart = this.cart$.getValue();
    const products = cart.products.filter(
      (p: OrderProduct) => p.product._id !== orderProductId
    );

    return new Observable((subscriber) => {
      if (this.userService.isSignedIn()) {
        this.removeFromCartServer(orderProductId).subscribe((cart: Cart) => {
          this.localStorageService.setItem(this.cardProductsKey, products);
          this.cart$.next(cart);
          subscriber.next(cart);
          subscriber.complete();
        });
      } else {
        const newCart = { ...cart, products };
        this.localStorageService.setItem(this.cardProductsKey, products);
        this.cart$.next(newCart);
        subscriber.next(newCart);
        subscriber.complete();
      }
    });
  }

  private getCart(): Observable<Cart> {
    const products = this.localStorageService.getItem('cartProducts') || [];

    return new Observable((subscriber) => {
      if (this.userService.isSignedIn()) {
        this.http.get<Cart>('/cart').subscribe((cart: Cart) => {
          subscriber.next({
            ...cart,
            ...(products && products.length && products),
          });
        });
      } else {
        subscriber.next({ products } as Cart);
        subscriber.complete();
      }
    });
  }

  private addToCartServer(orderProduct: UpsertOrderProduct) {
    return this.http.post('/cart', orderProduct);
  }

  private removeFromCartServer(orderProductId: string) {
    return this.http.delete('/cart', { params: { orderProductId } });
  }

  private upsert(array: OrderProduct[], item: OrderProduct) {
    const i = array.findIndex(
      (_item) => _item.product._id === item.product._id
    );
    if (i > -1) array[i] = item;
    else array.push(item);
  }
}
