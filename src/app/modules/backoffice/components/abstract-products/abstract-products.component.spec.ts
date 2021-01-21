import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractProductsComponent } from './abstract-products.component';

describe('AbstractProductsComponent', () => {
  let component: AbstractProductsComponent;
  let fixture: ComponentFixture<AbstractProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AbstractProductsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
