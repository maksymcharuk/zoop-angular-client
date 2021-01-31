import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractProductCreateComponent } from './abstract-product-create.component';

describe('AbstractProductCreateComponent', () => {
  let component: AbstractProductCreateComponent;
  let fixture: ComponentFixture<AbstractProductCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AbstractProductCreateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
