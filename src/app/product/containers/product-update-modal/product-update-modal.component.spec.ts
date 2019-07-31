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
  ProductUpdateComponent,
  ProductFormComponent
} from '@app/product/components';
import { ProductUpdateModalComponent } from '@app/product/containers';
import * as fromCivilities from '@app/product/state/reducers';

import { ProductUpdateModalActions } from '@app/product/state/actions';
import { Product } from '@app/product/models/product';

describe('UpdateProductModalComponent', () => {
  let fixture: ComponentFixture<ProductUpdateModalComponent>;
  let component: ProductUpdateModalComponent;
  let store: MockStore<fromCivilities.State>;
  let updated: MemoizedSelector<fromCivilities.State, boolean>;
  let product: MemoizedSelector<fromCivilities.State, Product>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductUpdateComponent,
        ProductUpdateModalComponent,
        ProductFormComponent
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

    fixture = TestBed.createComponent(ProductUpdateModalComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    updated = store.overrideSelector(
      fromCivilities.getProductEntitiesUpdated,
      false
    );
    product = store.overrideSelector(fromCivilities.getSelectedProduct, {
      id: 1,
      name: 'name'
    });
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a deleteProduct event on submit', () => {
    const data = {
      id: 1,
      product: {
        name: 'name'
      } as Product
    };
    const action = ProductUpdateModalActions.updateProduct({ data });
    fixture.detectChanges();
    component.onUpdate(data);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should close modal after product added', () => {
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
