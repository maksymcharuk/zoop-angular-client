import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractProductFormComponent } from './abstract-product-form.component';

describe('AbstractProductFormComponent', () => {
  let component: AbstractProductFormComponent;
  let fixture: ComponentFixture<AbstractProductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AbstractProductFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
