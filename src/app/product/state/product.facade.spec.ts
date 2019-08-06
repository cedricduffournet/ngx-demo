import { TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import * as fromProducts from '@app/product/state/reducers';
import {
  ProductListViewActions,
  ProductAddModalActions,
  ProductDeleteModalActions,
  ProductUpdateModalActions
} from '@app/product/state/actions';
import { ProductFacade } from '@app/product/state/product.facade';
import { Product } from '@app/product/models/product';

describe('ProductListViewComponent', () => {
  let store: MockStore<fromProducts.State>;
  let facade: ProductFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductFacade, provideMockStore()]
    });

    store = TestBed.get(Store);
    facade = TestBed.get(ProductFacade);
    spyOn(store, 'dispatch');
  });

  it('should dispatch loadProducts', () => {
    const action = ProductListViewActions.loadProducts();
    facade.loadProducts();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch navigateToAddProduct', () => {
    const action = ProductListViewActions.navigateToAddProduct();
    facade.navigateToAddProduct();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch showUpdateProductModal', () => {
    const action = ProductListViewActions.showUpdateProductModal();
    facade.showUpdateProductModal();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch selectProduct', () => {
    const action = ProductListViewActions.selectProduct({ id: 1 });
    facade.selectProduct(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch showDeleteProductModal', () => {
    const action = ProductListViewActions.showDeleteProductModal();
    facade.showDeleteProductModal();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch selectProduct', () => {
    const action = ProductListViewActions.selectProduct({ id: 1 });
    facade.selectProduct(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch addProduct', () => {
    const product = {
      id: 1,
      name: 'test'
    } as Product;

    const action = ProductAddModalActions.addProduct({ product });
    facade.addProduct(product);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch deleteProduct', () => {
    const product = {
      id: 1,
      name: 'test'
    } as Product;

    const action = ProductDeleteModalActions.deleteProduct({ product });
    facade.deleteProduct(product);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch updateProduct', () => {
    const data = {
      id: 1,
      product: {
        name: 'test'
      } as Product
    };

    const action = ProductUpdateModalActions.updateProduct({ data });
    facade.updateProduct(data);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch changePage', () => {
    const page = 1;
    const action = ProductListViewActions.changePage({ page });
    facade.changePage(page);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
