import { TestBed } from '@angular/core/testing';

import { AbstractProductsService } from './abstract-products.service';

describe('AbstractProductsService', () => {
  let service: AbstractProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
