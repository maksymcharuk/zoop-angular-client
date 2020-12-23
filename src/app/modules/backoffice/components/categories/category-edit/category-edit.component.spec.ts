import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEditComponent } from './category-edit.component';
import { ActivatedRoute } from '@angular/router';
import { of, from } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoriesService } from '../../../services/categories/categories.service';

describe('CategoryEditComponent', () => {
  let component: CategoryEditComponent;
  let fixture: ComponentFixture<CategoryEditComponent>;
  let testCategorys;
  let fakeCategorysService;
  let getCategorysSpy;
  let updateCategorySpy;
  const shopId = 1;
  const categoryId = 1;

  const fakeActivatedRoute = {
    params: of({ id: categoryId }),
    parent: {
      params: of({ id: shopId }),
    },
  };

  beforeEach(async(() => {
    testCategorys = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
      { id: 3, name: 'Category 3' },
    ];
    fakeCategorysService = jasmine.createSpyObj('CategorysService', [
      'getCategorys',
      'updateCategory',
    ]);
    getCategorysSpy = fakeCategorysService.getCategorys.and.returnValue(
      of(testCategorys)
    );
    updateCategorySpy = fakeCategorysService.updateCategory.and.returnValue(
      of(testCategorys[0])
    );

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CategoryEditComponent],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: CategoriesService, useValue: fakeCategorysService },
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
