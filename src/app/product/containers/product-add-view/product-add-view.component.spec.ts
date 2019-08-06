import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { PageInnerModule } from '@app/shared/page-inner';
import { ValidationActionModule } from '@app/shared/validation-action';

import { ProductAddViewComponent } from '@app/product/containers';
import {
  ProductAddComponent,
  ProductFormComponent
} from '@app/product/components';
import { Product } from '@app/product/models/product';
import { ProductFacade } from '@app/product/state/product.facade';
import { ProductCategoryFacade } from '@app/product-category/state/product-category.facade';

describe('ProductAddModalComponent', () => {
  let fixture: ComponentFixture<ProductAddViewComponent>;
  let component: ProductAddViewComponent;
  let facade: ProductFacade;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductAddComponent,
        ProductAddViewComponent,
        ProductFormComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        FormModule,
        ValidationActionModule,
        ReactiveFormsModule,
        PageInnerModule
      ],
      providers: [
        provideMockStore(),
        BsModalRef,
        {
          provide: ProductCategoryFacade,
          useValue: {
            productCategories$: of([]),
            loadProductCategories: jest.fn()
          }
        },
        {
          provide: ProductFacade,
          useValue: {
            added$: of(false),
            addProduct: jest.fn()
          }
        },
        {
          provide: Router,
          useValue: { navigate: jest.fn() }
        }
      ]
    });
    fixture = TestBed.createComponent(ProductAddViewComponent);
    facade = TestBed.get(ProductFacade);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should call addProduct event on submit', () => {
    spyOn(facade, 'addProduct');
    const product = {
      name: 'name'
    } as Product;
    fixture.detectChanges();
    component.onAdd(product);

    expect(facade.addProduct).toHaveBeenCalledWith(product);
  });

  it('should navigate to list on cancel', () => {
    fixture.detectChanges();
    component.onCancel();
    expect(router.navigate).toHaveBeenCalledWith(['parameters/products']);
  });
});
