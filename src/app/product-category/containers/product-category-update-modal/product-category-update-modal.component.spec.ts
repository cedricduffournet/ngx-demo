import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ModalWrapperModule } from '@app/shared/modal';

import {
  ProductCategoryUpdateComponent,
  ProductCategoryFormComponent
} from '@app/product-category/components';
import { ProductCategoryUpdateModalComponent } from '@app/product-category/containers';
import * as fromCivilities from '@app/product-category/state/reducers';

import { ProductCategoryUpdateModalActions } from '@app/product-category/state/actions';
import { ProductCategory } from '@app/product-category/models/product-category';

describe('UpdateProductCategoryModalComponent', () => {
  let fixture: ComponentFixture<ProductCategoryUpdateModalComponent>;
  let component: ProductCategoryUpdateModalComponent;
  let store: MockStore<fromCivilities.State>;
  let updated: MemoizedSelector<fromCivilities.State, boolean>;
  let productCategory: MemoizedSelector<fromCivilities.State, ProductCategory>;
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
      providers: [provideMockStore(), BsModalRef]
    });

    fixture = TestBed.createComponent(ProductCategoryUpdateModalComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    updated = store.overrideSelector(
      fromCivilities.getProductCategoryEntitiesUpdated,
      false
    );
    productCategory = store.overrideSelector(fromCivilities.getSelectedProductCategory, {
      id: 1,
      name: 'name'
    });
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a deleteProductCategory event on submit', () => {
    const data = {
      id: 1,
      productCategory: {
        name: 'name'
      } as ProductCategory
    };
    const action = ProductCategoryUpdateModalActions.updateProductCategory({ data });
    fixture.detectChanges();
    component.onUpdate(data);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should close modal after productCategory added', () => {
    spyOn(component.bsModalRef, 'hide');
    fixture.detectChanges();
    updated.setResult(true);
    store.setState({} as any);
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });

  it('should close modal on cancel', () => {
    spyOn(component.bsModalRef, 'hide');
    component.onCancel();
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });
});
