import { TestBed, ComponentFixture } from '@angular/core/testing';

import { Store, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';

import { ModalWrapperModule } from '@app/shared/modal';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ProductDeleteComponent } from '@app/product/components';
import { ProductDeleteModalComponent } from '@app/product/containers';
import * as fromProducts from '@app/product/state/reducers';
import { ProductDeleteModalActions } from '@app/product/state/actions';
import { Product } from '@app/product/models/product';

describe('DeleteProductModalComponent', () => {
  let fixture: ComponentFixture<ProductDeleteModalComponent>;
  let component: ProductDeleteModalComponent;
  let store: MockStore<fromProducts.State>;
  let deleted: MemoizedSelector<fromProducts.State, boolean>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDeleteComponent, ProductDeleteModalComponent],
      imports: [
        TranslateModule.forRoot(),
        ModalWrapperModule,
        ValidationActionModule
      ],
      providers: [provideMockStore(), BsModalRef]
    });

    fixture = TestBed.createComponent(ProductDeleteModalComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    deleted = store.overrideSelector(
      fromProducts.getProductCollectionDeleted,
      false
    );
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a deleteProduct event on submit', () => {
    const product = {
      id: 1,
      name: 'name'
    } as Product;
    const action = ProductDeleteModalActions.deleteProduct({ product });
    fixture.detectChanges();
    component.onDelete(product);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should close modal after product added', () => {
    spyOn(component.bsModalRef, 'hide');
    fixture.detectChanges();
    deleted.setResult(true);
    store.setState({} as any);
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });

  it('should close modal on cancel', () => {
    spyOn(component.bsModalRef, 'hide');
    component.onCancel();
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });
});
