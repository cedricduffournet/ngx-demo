import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ModalWrapperModule } from '@app/shared/modal';
import { ProductCategoryFacade } from '@app/product-category/state/product-category.facade';

import {
  ProductCategoryUpdateComponent,
  ProductCategoryFormComponent
} from '@app/product-category/components';
import { ProductCategoryUpdateModalComponent } from '@app/product-category/containers';
import { ProductCategory } from '@app/product-category/models/product-category';

describe('UpdateProductCategoryModalComponent', () => {
  let fixture: ComponentFixture<ProductCategoryUpdateModalComponent>;
  let component: ProductCategoryUpdateModalComponent;
  let facade: ProductCategoryFacade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductCategoryUpdateComponent,
        ProductCategoryUpdateModalComponent,
        ProductCategoryFormComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        FormModule,
        ValidationActionModule,
        ModalWrapperModule,
        ReactiveFormsModule
      ],
      providers: [
        provideMockStore(),
        BsModalRef,
        {
          provide: ProductCategoryFacade,
          useValue: {
            selected$: of({
              name: 'TestName'
            }),
            updated$: of(false),
            updateProductCategory: jest.fn()
          }
        }
      ]
    });

    fixture = TestBed.createComponent(ProductCategoryUpdateModalComponent);
    component = fixture.componentInstance;
    facade = TestBed.get(ProductCategoryFacade);
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should call updateProductCategory event on submit', () => {
    spyOn(facade, 'updateProductCategory');
    const data = {
      id: 1,
      productCategory: {
        name: 'name'
      } as ProductCategory
    };
    fixture.detectChanges();
    component.onUpdate(data);
    expect(facade.updateProductCategory).toHaveBeenCalledWith(data);
  });

  it('should close if productCategory updated', () => {
    spyOn(component.bsModalRef, 'hide');
    facade.updated$ = of(true);
    fixture.detectChanges();
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });

  it('should close modal on cancel', () => {
    spyOn(component.bsModalRef, 'hide');
    fixture.detectChanges();
    component.onCancel();
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });

  it('should unsubscribe subscription when destroyed', () => {
    fixture.detectChanges();
    spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});
