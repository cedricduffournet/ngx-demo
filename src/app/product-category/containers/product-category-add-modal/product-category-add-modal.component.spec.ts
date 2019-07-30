import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { Store, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ModalWrapperModule } from '@app/shared/modal';

import { ProductCategoryAddModalComponent } from '@app/product-category/containers';
import { ProductCategoryAddModalActions } from '@app/product-category/state/actions';
import {
  ProductCategoryAddComponent,
  ProductCategoryFormComponent
} from '@app/product-category/components';
import { ProductCategory } from '@app/product-category/models/product-category';
import * as fromCivilities from '@app/product-category/state/reducers';

describe('ProductCategoryAddModalComponent', () => {
  let fixture: ComponentFixture<ProductCategoryAddModalComponent>;
  let component: ProductCategoryAddModalComponent;
  let store: MockStore<fromCivilities.State>;
  let added: MemoizedSelector<fromCivilities.State, boolean>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductCategoryAddComponent,
        ProductCategoryAddModalComponent,
        ProductCategoryFormComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        FormModule,
        ValidationActionModule,
        ReactiveFormsModule,
        ModalWrapperModule
      ],
      providers: [provideMockStore(), BsModalRef]
    });

    fixture = TestBed.createComponent(ProductCategoryAddModalComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    added = store.overrideSelector(
      fromCivilities.getProductCategoryCollectionAdded,
      false
    );
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a addProductCategory event on submit', () => {
    const productCategory = {
      name: 'name'
    } as ProductCategory;
    const action = ProductCategoryAddModalActions.addProductCategory({ productCategory });
    fixture.detectChanges();
    component.onAdd(productCategory);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should close modal after productCategory added', () => {
    spyOn(component.bsModalRef, 'hide');
    fixture.detectChanges();
    added.setResult(true);
    // need this to trigger state change (see : https://github.com/ngrx/platform/issues/2000)
    store.setState({} as any);
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });

  it('should close modal on cancel', () => {
    spyOn(component.bsModalRef, 'hide');
    component.onCancel();
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });
});
