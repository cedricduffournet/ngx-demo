import { TestBed, ComponentFixture } from '@angular/core/testing';

import { Store, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';

import { ModalWrapperModule } from '@app/shared/modal';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ProductCategoryDeleteComponent } from '@app/product-category/components';
import { ProductCategoryDeleteModalComponent } from '@app/product-category/containers';
import * as fromProductCategories from '@app/product-category/state/reducers';
import { ProductCategoryDeleteModalActions } from '@app/product-category/state/actions';
import { ProductCategory } from '@app/product-category/models/product-category';

describe('DeleteProductCategoryModalComponent', () => {
  let fixture: ComponentFixture<ProductCategoryDeleteModalComponent>;
  let component: ProductCategoryDeleteModalComponent;
  let store: MockStore<fromProductCategories.State>;
  let deleted: MemoizedSelector<fromProductCategories.State, boolean>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCategoryDeleteComponent, ProductCategoryDeleteModalComponent],
      imports: [
        TranslateModule.forRoot(),
        ModalWrapperModule,
        ValidationActionModule
      ],
      providers: [provideMockStore(), BsModalRef]
    });

    fixture = TestBed.createComponent(ProductCategoryDeleteModalComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    deleted = store.overrideSelector(
      fromProductCategories.getProductCategoryCollectionDeleted,
      false
    );
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a deleteProductCategory event on submit', () => {
    const productCategory = {
      id: 1,
      name: 'name'
    } as ProductCategory;
    const action = ProductCategoryDeleteModalActions.deleteProductCategory({ productCategory });
    fixture.detectChanges();
    component.onDelete(productCategory);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should close modal after productCategory added', () => {
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
