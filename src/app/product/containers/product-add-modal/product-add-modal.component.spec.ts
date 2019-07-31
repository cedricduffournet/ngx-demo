import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { Store, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ModalWrapperModule } from '@app/shared/modal';

import { ProductAddModalComponent } from '@app/product/containers';
import { ProductAddModalActions } from '@app/product/state/actions';
import {
  ProductAddComponent,
  ProductFormComponent
} from '@app/product/components';
import { Product } from '@app/product/models/product';
import * as fromCivilities from '@app/product/state/reducers';

describe('ProductAddModalComponent', () => {
  let fixture: ComponentFixture<ProductAddModalComponent>;
  let component: ProductAddModalComponent;
  let store: MockStore<fromCivilities.State>;
  let added: MemoizedSelector<fromCivilities.State, boolean>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductAddComponent,
        ProductAddModalComponent,
        ProductFormComponent
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

    fixture = TestBed.createComponent(ProductAddModalComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    added = store.overrideSelector(
      fromCivilities.getProductCollectionAdded,
      false
    );
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a addProduct event on submit', () => {
    const product = {
      name: 'name'
    } as Product;
    const action = ProductAddModalActions.addProduct({ product });
    fixture.detectChanges();
    component.onAdd(product);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should close modal after product added', () => {
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
