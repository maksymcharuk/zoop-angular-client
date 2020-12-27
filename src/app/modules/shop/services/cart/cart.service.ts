import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Product } from '../../../../interfaces';
import { CartProduct } from '../../interfaces/cart-product.inteface';

import { LocalStorageService } from '../../../../shared/services/local-storage/local-storage.service';
import { UserService } from '../../../../shared/services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public products$: BehaviorSubject<CartProduct[]> = new BehaviorSubject([]);

  private cardProductsKey = 'cartProducts';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {
    this.getProducts().subscribe((products: CartProduct[]) => {
      this.products$.next(products);
    });
  }

  public add(product: CartProduct): void {
    const products = this.products$.getValue();
    this.upsert(products, product);
    this.localStorageService.setItem(this.cardProductsKey, products);
    this.products$.next(products);
  }

  public remove(product: Product): void {
    const products = this.products$
      .getValue()
      .filter((p: CartProduct) => p.product._id !== product._id);
    this.localStorageService.setItem(this.cardProductsKey, products);
    this.products$.next(products);
  }

  private getProducts(): Observable<CartProduct[]> {
    const products = this.localStorageService.getItem('cartProducts') || [];
    let products$;

    if (!products && this.userService.isSignedIn()) {
      products$ = this.http.get<CartProduct[]>('/cart/products');
    } else {
      products$ = of(products);
    }

    return products$;
  }

  private upsert(array: CartProduct[], item: CartProduct) {
    const i = array.findIndex(
      (_item) => _item.product._id === item.product._id
    );
    if (i > -1) array[i] = item;
    else array.push(item);
  }
}
