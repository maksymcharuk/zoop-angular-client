import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEditComponent } from './category-edit.component';
import { ActivatedRoute } from '@angular/router';
import { of, from } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoriesService } from '../../../services/categories/categories.service';

describe('CategoryEditComponent', () => {
  let component: CategoryEditComponent;
  let fixture: ComponentFixture<CategoryEditComponent>;
  let testCategories;
  let fakeCategoriesService;
  let getCategoriesSpy;
  let updateCategoriespy;
  const shopId = 1;
  const categoryId = 1;

  const fakeActivatedRoute = {
    params: of({ id: categoryId }),
    parent: {
      params: of({ id: shopId }),
    },
  };

  beforeEach(async(() => {
    testCategories = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
      { id: 3, name: 'Category 3' },
    ];
    fakeCategoriesService = jasmine.createSpyObj('CategoriesService', [
      'getCategories',
      'updateCategory',
    ]);
    getCategoriesSpy = fakeCategoriesService.getCategories.and.returnValue(
      of(testCategories)
    );
    updateCategoriespy = fakeCategoriesService.updateCategory.and.returnValue(
      of(testCategories[0])
    );

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CategoryEditComponent],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: CategoriesService, useValue: fakeCategoriesService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
