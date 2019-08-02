import { TestBed } from '@angular/core/testing';

import { cold, hot } from 'jasmine-marbles';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { ProductEffects } from '@app/product/state/effects';
import { ProductService } from '@app/product/services';

import {
  ProductAddModalActions,
  ProductUpdateModalActions,
  ProductListViewActions,
  ProductApiActions,
  ProductDeleteModalActions
} from '@app/product/state/actions';
import { ToasterActions } from '@app/core/state/actions';

import {
  ProductUpdateModalComponent,
  ProductAddModalComponent,
  ProductDeleteModalComponent
} from '@app/product/containers';
import { CRUD_MODAL_CONFIG } from '@app/shared/models/modal-config';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Product } from '@app/product/models/product';
import { ProductFacade } from '@app/product/state/product.facade';

describe('ProductEffects', () => {
  let effects: ProductEffects;
  let actions$: Observable<any>;
  let ts: TranslateService;
  let service: any;
  let modal: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        provideMockActions(() => actions$),
        {
          provide: ProductService,
          useValue: {
            loadProducts: jest.fn(),
            addProduct: jest.fn(),
            updateProduct: jest.fn(),
            deleteProduct: jest.fn()
          }
        },
        {
          provide: TranslateService,
          useValue: { instant: jest.fn() }
        },
        {
          provide: BsModalService,
          useValue: { show: jest.fn() }
        },
        provideMockStore(),
        {
          provide: ProductFacade,
          useValue: { config$: of({}) }
        }
      ]
    });
    effects = TestBed.get(ProductEffects);
    service = TestBed.get(ProductService);
    ts = TestBed.get(TranslateService);
    modal = TestBed.get(BsModalService);
    actions$ = TestBed.get(Actions);
    spyOn(modal, 'show').and.callThrough();
  });

  describe('changePage$', () => {
    it('should dipatch load product when changing page', () => {
      const action = ProductListViewActions.changePage({ page: 1 });
      actions$ = hot('-a-', { a: action });
      const success = ProductListViewActions.loadProducts();
      const expected = cold('-a-', { a: success });
      expect(effects.changePage$).toBeObservable(expected);
    });
  });

  describe('loadProducts$', () => {
    const products = {
      entities: {
        1: {
          name: 'Name 1'
        },
        2: {
          name: 'Name 2'
        }
      },
      result: [1, 2]
    };
    const meta = {
      itemsPerPage: 10,
      page: 1,
      pageCount: 1,
      totalItems: 2
    };

    function loadProductSuccess(
      action:
        | typeof ProductListViewActions.loadProducts
    ) {
      const createAction = action();
      const success = ProductApiActions.loadProductSuccess({
        products,
        meta
      });

      actions$ = hot('-a-', { a: createAction });
      const response = cold('-a|', { a: { products, meta } });
      const expected = cold('--b', { b: success });
      service.loadProducts = jest.fn(() => response);

      expect(effects.loadProducts$).toBeObservable(expected);
    }

    function loadProductFailure(
      action:
        | typeof ProductListViewActions.loadProducts
    ) {
      const createAction = action();
      const fail = ProductApiActions.loadProductFailure({
        error: 'Error loading'
      });

      actions$ = hot('-a-', { a: createAction });
      const response = cold('-#|', {}, { error: 'Error loading' });
      const expected = cold('--b', { b: fail });
      service.loadProducts = jest.fn(() => response);

      expect(effects.loadProducts$).toBeObservable(expected);
    }

    it('should return a loadProductSuccess, when ProductListViewActions.loadProducts, with products, on success', () => {
      const action = ProductListViewActions.loadProducts;
      loadProductSuccess(action);
    });


    it('should return a loadProductFailure, when ProductListViewActions.loadProducts on error', () => {
      const action = ProductListViewActions.loadProducts;
      loadProductFailure(action);
    });

  });

  describe('addProductModal$', () => {
    it('should open a modal with AddProductModalComponent component', (done: any) => {
      const action = ProductListViewActions.showAddProductModal();

      actions$ = of(action);

      effects.addProductModal$.subscribe(() => {
        expect(modal.show).toHaveBeenCalledWith(
          ProductAddModalComponent,
          CRUD_MODAL_CONFIG
        );
        done();
      });
    });
  });

  describe('addProduct$', () => {
    const product = {
      name: 'Name'
    } as Product;

    it('should return a addProductSuccess with added product on success', () => {
      const productSuccess = {
        entities: {
          1: {
            id: 1,
            name: 'Name'
          }
        },
        result: 1
      };

      const action = ProductAddModalActions.addProduct({ product });
      const success = ProductApiActions.addProductSuccess({
        product: productSuccess
      });

      actions$ = hot('-a-', { a: action });
      const response = cold('-a|', { a: productSuccess });
      const expected = cold('--b', { b: success });
      service.addProduct = jest.fn(() => response);

      expect(effects.addProduct$).toBeObservable(expected);
    });

    it('should return a addProductFailure on error', () => {
      const action = ProductAddModalActions.addProduct({ product });
      const fail = ProductApiActions.addProductFailure({
        error: 'Error loading'
      });
      const error = 'Error loading';

      actions$ = hot('-a-', { a: action });
      const response = cold('-#|', {}, { error });
      const expected = cold('--b', { b: fail });
      service.addProduct = jest.fn(() => response);

      expect(effects.addProduct$).toBeObservable(expected);
    });
  });

  describe('addSuccessProduct', () => {
    it('should return an ToasterActions.pop when product added success', () => {
      const productSuccess = {
        entities: {
          1: {
            name: 'Name'
          }
        },
        result: 1
      };
      const toasterConfig = {
        type: 'success',
        title: 'translation',
        body: ''
      };
      const action = ProductApiActions.addProductSuccess({
        product: productSuccess
      });

      ts.instant = jest.fn(() => 'translation');
      const pop = ToasterActions.pop({ params: toasterConfig });

      actions$ = hot('a', { a: action });
      const expected = cold('b', { b: pop });

      expect(effects.addSuccessProduct$).toBeObservable(expected);
    });
  });

  describe('updateProductModal$', () => {
    it('should open a modal with UpdateProductModalComponent component', (done: any) => {
      const action = ProductListViewActions.showUpdateProductModal();

      actions$ = of(action);

      effects.updateProductModal$.subscribe(() => {
        expect(modal.show).toHaveBeenCalledWith(
          ProductUpdateModalComponent,
          CRUD_MODAL_CONFIG
        );
        done();
      });
    });
  });

  describe('updateProduct$', () => {
    const product = {
      name: 'NameUpdated'
    } as Product;

    const id = 1;

    it('should return a updateProductSuccess with updated product on success', () => {
      const productSuccess = {
        entities: {
          1: {
            name: 'Name'
          }
        },
        result: 1
      };

      const action = ProductUpdateModalActions.updateProduct({
        data: { id, product }
      });
      const success = ProductApiActions.updateProductSuccess({
        product: productSuccess
      });

      actions$ = hot('-a-', { a: action });
      const response = cold('-a|', { a: productSuccess });
      const expected = cold('--b', { b: success });
      service.updateProduct = jest.fn(() => response);

      expect(effects.updateProduct$).toBeObservable(expected);
    });

    it('should return a addProductFailure on error', () => {
      const action = ProductUpdateModalActions.updateProduct({
        data: { id, product }
      });
      const fail = ProductApiActions.updateProductFailure({
        error: 'Error loading'
      });
      const error = 'Error loading';

      actions$ = hot('-a-', { a: action });
      const response = cold('-#|', {}, { error });
      const expected = cold('--b', { b: fail });
      service.updateProduct = jest.fn(() => response);

      expect(effects.updateProduct$).toBeObservable(expected);
    });
  });

  describe('updateSuccessProduct', () => {
    it('should return an ToasterActions.pop when product update success', () => {
      const productSuccess = {
        entities: {
          1: {
            name: 'Name'
          }
        },
        result: 1
      };
      const toasterConfig = {
        type: 'success',
        title: 'translation',
        body: ''
      };
      const action = ProductApiActions.updateProductSuccess({
        product: productSuccess
      });

      ts.instant = jest.fn(() => 'translation');
      const pop = ToasterActions.pop({ params: toasterConfig });

      actions$ = hot('a', { a: action });
      const expected = cold('b', { b: pop });

      expect(effects.updateSuccessProduct$).toBeObservable(expected);
    });
  });

  describe('deleteProductModal$', () => {
    it('should open a modal with DeleteProductModalComponent component', (done: any) => {
      const action = ProductListViewActions.showDeleteProductModal();

      actions$ = of(action);

      effects.deleteProductModal$.subscribe(() => {
        expect(modal.show).toHaveBeenCalledWith(
          ProductDeleteModalComponent,
          CRUD_MODAL_CONFIG
        );
        done();
      });
    });
  });

  describe('deleteProduct$', () => {
    const product = {
      id: 1,
      name: 'Name'
    } as Product;

    it('should return a deleteProductSuccess with delete product id on success', () => {
      const idSuccess = { id: 1 };
      const action = ProductDeleteModalActions.deleteProduct({ product });
      const success = ProductApiActions.deleteProductSuccess(idSuccess);

      actions$ = hot('-a-', { a: action });
      const response = cold('-a|', { a: idSuccess });
      const expected = cold('--b', { b: success });
      service.deleteProduct = jest.fn(() => response);

      expect(effects.deleteProduct$).toBeObservable(expected);
    });

    it('should return a deleteProductFailure on error', () => {
      const action = ProductDeleteModalActions.deleteProduct({ product });
      const fail = ProductApiActions.deleteProductFailure({
        error: 'Error loading'
      });
      const error = 'Error loading';

      actions$ = hot('-a-', { a: action });
      const response = cold('-#|', {}, { error });
      const expected = cold('--b', { b: fail });
      service.deleteProduct = jest.fn(() => response);

      expect(effects.deleteProduct$).toBeObservable(expected);
    });
  });

  describe('deleteSuccessProduct', () => {
    it('should return an ToasterActions.pop when product delete success', () => {
      const id = 1;
      const toasterConfig = {
        type: 'success',
        title: 'translation',
        body: ''
      };

      const action = ProductApiActions.deleteProductSuccess({
        id
      });

      ts.instant = jest.fn(() => 'translation');
      const pop = ToasterActions.pop({ params: toasterConfig });

      actions$ = hot('a', { a: action });
      const expected = cold('b', { b: pop });

      expect(effects.deleteSuccessProduct$).toBeObservable(expected);
    });
  });

  describe('failProduct$', () => {
    function productFailure(
      action:
        | typeof ProductApiActions.loadProductFailure
        | typeof ProductApiActions.updateProductFailure
        | typeof ProductApiActions.addProductFailure
        | typeof ProductApiActions.deleteProductFailure
    ) {
      const toasterConfig = {
        type: 'error',
        title: 'error',
        body: ''
      };
      const createAction = action({ error: { message: 'error' } });
      actions$ = hot('a', { a: createAction });

      const pop = ToasterActions.pop({ params: toasterConfig });
      const expected = cold('b', { b: pop });

      expect(effects.failProduct$).toBeObservable(expected);
    }

    it('should return an ToasterActions.pop when ProductApiActions.loadProductFailure', () => {
      const action = ProductApiActions.loadProductFailure;
      productFailure(action);
    });

    it('should return an ToasterActions.pop when ProductApiActions.updateProductFailure', () => {
      const action = ProductApiActions.updateProductFailure;
      productFailure(action);
    });

    it('should return an ToasterActions.pop when ProductApiActions.addProductFailure', () => {
      const action = ProductApiActions.addProductFailure;
      productFailure(action);
    });

    it('should return an ToasterActions.pop when ProductApiActions.deleteProductFailure', () => {
      const action = ProductApiActions.deleteProductFailure;
      productFailure(action);
    });
  });
});
