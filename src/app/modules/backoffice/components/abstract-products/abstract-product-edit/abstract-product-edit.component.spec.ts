import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AbstractProductEditComponent } from './abstract-product-edit.component';
import { ProductsService } from '../../../../../shared/services/products/products.service';

describe('AbstractProductEditComponent', () => {
  let component: AbstractProductEditComponent;
  let fixture: ComponentFixture<AbstractProductEditComponent>;
  let testProducts;
  let fakeProductsService;
  let getProductsSpy;
  let updateProductSpy;
  const shopId = 1;
  const productId = 1;

  const fakeActivatedRoute = {
    params: of({ id: productId }),
    parent: {
      params: of({ id: shopId })
    }
  };

  beforeEach(async(() => {
    testProducts = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
      { id: 3, name: 'Product 3' }
    ];
    fakeProductsService = jasmine.createSpyObj('ProductsService', [
      'getProducts',
      'updateProduct'
    ]);
    getProductsSpy = fakeProductsService.getProducts.and.returnValue(
      of(testProducts)
    );
    updateProductSpy = fakeProductsService.updateProduct.and.returnValue(
      of(testProducts[0])
    );

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AbstractProductEditComponent],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: ProductsService, useValue: fakeProductsService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducts on init with correct shopId', () => {
    expect(getProductsSpy).toHaveBeenCalledWith(shopId);
  });

  it('should call updateProduct on submit', () => {
    const product = { name: testProducts[0].name };

    component.onSubmit(product);

    expect(updateProductSpy).toHaveBeenCalledWith(shopId, productId, product);
  });
});
