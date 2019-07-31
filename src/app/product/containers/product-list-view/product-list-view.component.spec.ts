import { TestBed, ComponentFixture } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import {
  ProductItemComponent,
  ProductItemsComponent
} from '@app/product/components';
import { ProductListViewComponent } from '@app/product/containers';
import * as fromProducts from '@app/product/state/reducers';
import { ProductListViewActions } from '@app/product/state/actions';
import { SharedModule } from '@app/shared/shared.module';

describe('ProductListViewComponent', () => {
  let fixture: ComponentFixture<ProductListViewComponent>;
  let component: ProductListViewComponent;
  let store: MockStore<fromProducts.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductListViewComponent,
        ProductItemsComponent,
        ProductItemComponent
      ],
      imports: [SharedModule, TranslateModule.forRoot()],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: fromProducts.getProducts,
              value: []
            },
            {
              selector: fromProducts.getProductAuthorization,
              value: {
                create: true,
                delete: true,
                update: true
              }
            }
          ]
        })
      ]
    });

    fixture = TestBed.createComponent(ProductListViewComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch loadProducts on init', () => {
    const action = ProductListViewActions.loadProducts();
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch showAddProductModal on add event', () => {
    const action = ProductListViewActions.showAddProductModal();
    component.onAdd();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch showUpdateProductModal on update event', () => {
    const action = ProductListViewActions.showUpdateProductModal();
    component.onUpdate(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch selectProduct on update event', () => {
    const action = ProductListViewActions.selectProduct({ id: 1 });
    component.onUpdate(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch showDeleteProductModal on update event', () => {
    const action = ProductListViewActions.showDeleteProductModal();
    component.onDelete(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch selectProduct on deletee event', () => {
    const action = ProductListViewActions.selectProduct({ id: 1 });
    component.onDelete(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
