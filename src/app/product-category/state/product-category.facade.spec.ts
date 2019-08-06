import { TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import * as fromProductCategories from '@app/product-category/state/reducers';
import {
  ProductCategoryListViewActions,
  ProductCategoryAddModalActions,
  ProductCategoryDeleteModalActions,
  ProductCategoryUpdateModalActions
} from '@app/product-category/state/actions';
import { ProductCategoryFacade } from '@app/product-category/state/product-category.facade';
import { ProductCategory } from '@app/product-category/models/product-category';

describe('ProductCategoryListViewComponent', () => {
  let store: MockStore<fromProductCategories.State>;
  let facade: ProductCategoryFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductCategoryFacade, provideMockStore()]
    });

    store = TestBed.get(Store);
    facade = TestBed.get(ProductCategoryFacade);
    spyOn(store, 'dispatch');
  });

  it('should dispatch loadProductCategories', () => {
    const action = ProductCategoryListViewActions.loadProductCategories();
    facade.loadProductCategories();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch showAddProductCategoryModal', () => {
    const action = ProductCategoryListViewActions.showAddProductCategoryModal();
    facade.showAddProductCategoryModal();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch showUpdateProductCategoryModal', () => {
    const action = ProductCategoryListViewActions.showUpdateProductCategoryModal();
    facade.showUpdateProductCategoryModal();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch selectProductCategory', () => {
    const action = ProductCategoryListViewActions.selectProductCategory({ id: 1 });
    facade.selectProductCategory(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch showDeleteProductCategoryModal', () => {
    const action = ProductCategoryListViewActions.showDeleteProductCategoryModal();
    facade.showDeleteProductCategoryModal();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch selectProductCategory', () => {
    const action = ProductCategoryListViewActions.selectProductCategory({ id: 1 });
    facade.selectProductCategory(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch addProductCategory', () => {
    const productCategory = {
      id: 1,
      name: 'test'
    } as ProductCategory;

    const action = ProductCategoryAddModalActions.addProductCategory({ productCategory });
    facade.addProductCategory(productCategory);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch deleteProductCategory', () => {
    const productCategory = {
      id: 1,
      name: 'test'
    } as ProductCategory;

    const action = ProductCategoryDeleteModalActions.deleteProductCategory({ productCategory });
    facade.deleteProductCategory(productCategory);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch updateProductCategory', () => {
    const data = {
      id: 1,
      productCategory: {
        name: 'test'
      } as ProductCategory
    };

    const action = ProductCategoryUpdateModalActions.updateProductCategory({ data });
    facade.updateProductCategory(data);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
