import { TestBed } from '@angular/core/testing';

import { cold, hot } from 'jasmine-marbles';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { ProductCategoryEffects } from '@app/product-category/state/effects';
import { ProductCategoryService } from '@app/product-category/services';

import {
  ProductCategoryAddModalActions,
  ProductCategoryUpdateModalActions,
  ProductCategoryListViewActions,
  ProductCategoryApiActions,
  ProductCategoryDeleteModalActions
} from '@app/product-category/state/actions';
import { ToasterActions } from '@app/core/state/actions';

import {
  ProductCategoryUpdateModalComponent,
  ProductCategoryAddModalComponent,
  ProductCategoryDeleteModalComponent
} from '@app/product-category/containers';
import { CRUD_MODAL_CONFIG } from '@app/shared/models/modal-config';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ProductCategory } from '@app/product-category/models/product-category';

describe('ProductCategoryEffects', () => {
  let effects: ProductCategoryEffects;
  let actions$: Observable<any>;
  let ts: TranslateService;
  let service: any;
  let modal: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductCategoryEffects,
        provideMockActions(() => actions$),
        {
          provide: ProductCategoryService,
          useValue: {
            loadProductCategories: jest.fn(),
            addProductCategory: jest.fn(),
            updateProductCategory: jest.fn(),
            deleteProductCategory: jest.fn()
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
        provideMockStore()
      ]
    });
    effects = TestBed.get(ProductCategoryEffects);
    service = TestBed.get(ProductCategoryService);
    ts = TestBed.get(TranslateService);
    modal = TestBed.get(BsModalService);
    actions$ = TestBed.get(Actions);
    spyOn(modal, 'show').and.callThrough();
  });

  describe('loadProductCategories$', () => {
    const productCategories = {
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

    function loadProductCategorySuccess(
      action: typeof ProductCategoryListViewActions.loadProductCategories
    ) {
      const createAction = action();
      const success = ProductCategoryApiActions.loadProductCategorySuccess({
        productCategories
      });

      actions$ = hot('-a-', { a: createAction });
      const response = cold('-a|', { a: productCategories });
      const expected = cold('--b', { b: success });
      service.loadProductCategories = jest.fn(() => response);

      expect(effects.loadProductCategories$).toBeObservable(expected);
    }

    function loadProductCategoryFailure(
      action: typeof ProductCategoryListViewActions.loadProductCategories
    ) {
      const createAction = action();
      const fail = ProductCategoryApiActions.loadProductCategoryFailure({
        error: 'Error loading'
      });

      actions$ = hot('-a-', { a: createAction });
      const response = cold('-#|', {}, { error: 'Error loading' });
      const expected = cold('--b', { b: fail });
      service.loadProductCategories = jest.fn(() => response);

      expect(effects.loadProductCategories$).toBeObservable(expected);
    }

    it(
      'should return a loadProductCategorySuccess, when ProductCategoryListViewActions.loadProductCategories, ' +
        'with productCategories, on success',
      () => {
        const action = ProductCategoryListViewActions.loadProductCategories;
        loadProductCategorySuccess(action);
      }
    );

    it('should return a loadProductCategoryFailure, when ProductCategoryListViewActions.loadProductCategories on error', () => {
      const action = ProductCategoryListViewActions.loadProductCategories;
      loadProductCategoryFailure(action);
    });
  });

  describe('addProductCategoryModal$', () => {
    it('should open a modal with AddProductCategoryModalComponent component', (done: any) => {
      const action = ProductCategoryListViewActions.showAddProductCategoryModal();

      actions$ = of(action);

      effects.addProductCategoryModal$.subscribe(() => {
        expect(modal.show).toHaveBeenCalledWith(
          ProductCategoryAddModalComponent,
          CRUD_MODAL_CONFIG
        );
        done();
      });
    });
  });

  describe('addProductCategory$', () => {
    const productCategory = {
      name: 'Name'
    } as ProductCategory;

    it('should return a addProductCategorySuccess with added productCategory on success', () => {
      const productCategorySuccess = {
        entities: {
          1: {
            id: 1,
            name: 'Name'
          }
        },
        result: 1
      };

      const action = ProductCategoryAddModalActions.addProductCategory({
        productCategory
      });
      const success = ProductCategoryApiActions.addProductCategorySuccess({
        productCategory: productCategorySuccess
      });

      actions$ = hot('-a-', { a: action });
      const response = cold('-a|', { a: productCategorySuccess });
      const expected = cold('--b', { b: success });
      service.addProductCategory = jest.fn(() => response);

      expect(effects.addProductCategory$).toBeObservable(expected);
    });

    it('should return a addProductCategoryFailure on error', () => {
      const action = ProductCategoryAddModalActions.addProductCategory({
        productCategory
      });
      const fail = ProductCategoryApiActions.addProductCategoryFailure({
        error: 'Error loading'
      });
      const error = 'Error loading';

      actions$ = hot('-a-', { a: action });
      const response = cold('-#|', {}, { error });
      const expected = cold('--b', { b: fail });
      service.addProductCategory = jest.fn(() => response);

      expect(effects.addProductCategory$).toBeObservable(expected);
    });
  });

  describe('addSuccessProductCategory', () => {
    it('should return an ToasterActions.pop when productCategory added success', () => {
      const productCategorySuccess = {
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
      const action = ProductCategoryApiActions.addProductCategorySuccess({
        productCategory: productCategorySuccess
      });

      ts.instant = jest.fn(() => 'translation');
      const pop = ToasterActions.pop({ params: toasterConfig });

      actions$ = hot('a', { a: action });
      const expected = cold('b', { b: pop });

      expect(effects.addSuccessProductCategory$).toBeObservable(expected);
    });
  });

  describe('updateProductCategoryModal$', () => {
    it('should open a modal with UpdateProductCategoryModalComponent component', (done: any) => {
      const action = ProductCategoryListViewActions.showUpdateProductCategoryModal();

      actions$ = of(action);

      effects.updateProductCategoryModal$.subscribe(() => {
        expect(modal.show).toHaveBeenCalledWith(
          ProductCategoryUpdateModalComponent,
          CRUD_MODAL_CONFIG
        );
        done();
      });
    });
  });

  describe('updateProductCategory$', () => {
    const productCategory = {
      name: 'NameUpdated'
    } as ProductCategory;

    const id = 1;

    it('should return a updateProductCategorySuccess with updated productCategory on success', () => {
      const productCategorySuccess = {
        entities: {
          1: {
            name: 'Name'
          }
        },
        result: 1
      };

      const action = ProductCategoryUpdateModalActions.updateProductCategory({
        data: { id, productCategory }
      });
      const success = ProductCategoryApiActions.updateProductCategorySuccess({
        productCategory: productCategorySuccess
      });

      actions$ = hot('-a-', { a: action });
      const response = cold('-a|', { a: productCategorySuccess });
      const expected = cold('--b', { b: success });
      service.updateProductCategory = jest.fn(() => response);

      expect(effects.updateProductCategory$).toBeObservable(expected);
    });

    it('should return a addProductCategoryFailure on error', () => {
      const action = ProductCategoryUpdateModalActions.updateProductCategory({
        data: { id, productCategory }
      });
      const fail = ProductCategoryApiActions.updateProductCategoryFailure({
        error: 'Error loading'
      });
      const error = 'Error loading';

      actions$ = hot('-a-', { a: action });
      const response = cold('-#|', {}, { error });
      const expected = cold('--b', { b: fail });
      service.updateProductCategory = jest.fn(() => response);

      expect(effects.updateProductCategory$).toBeObservable(expected);
    });
  });

  describe('updateSuccessProductCategory', () => {
    it('should return an ToasterActions.pop when productCategory update success', () => {
      const productCategorySuccess = {
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
      const action = ProductCategoryApiActions.updateProductCategorySuccess({
        productCategory: productCategorySuccess
      });

      ts.instant = jest.fn(() => 'translation');
      const pop = ToasterActions.pop({ params: toasterConfig });

      actions$ = hot('a', { a: action });
      const expected = cold('b', { b: pop });

      expect(effects.updateSuccessProductCategory$).toBeObservable(expected);
    });
  });

  describe('deleteProductCategoryModal$', () => {
    it('should open a modal with DeleteProductCategoryModalComponent component', (done: any) => {
      const action = ProductCategoryListViewActions.showDeleteProductCategoryModal();

      actions$ = of(action);

      effects.deleteProductCategoryModal$.subscribe(() => {
        expect(modal.show).toHaveBeenCalledWith(
          ProductCategoryDeleteModalComponent,
          CRUD_MODAL_CONFIG
        );
        done();
      });
    });
  });

  describe('deleteProductCategory$', () => {
    const productCategory = {
      id: 1,
      name: 'Name'
    };

    it('should return a deleteProductCategorySuccess with delete productCategory id on success', () => {
      const idSuccess = { id: 1 };
      const action = ProductCategoryDeleteModalActions.deleteProductCategory({
        productCategory
      });
      const success = ProductCategoryApiActions.deleteProductCategorySuccess(
        idSuccess
      );

      actions$ = hot('-a-', { a: action });
      const response = cold('-a|', { a: idSuccess });
      const expected = cold('--b', { b: success });
      service.deleteProductCategory = jest.fn(() => response);

      expect(effects.deleteProductCategory$).toBeObservable(expected);
    });

    it('should return a deleteProductCategoryFailure on error', () => {
      const action = ProductCategoryDeleteModalActions.deleteProductCategory({
        productCategory
      });
      const fail = ProductCategoryApiActions.deleteProductCategoryFailure({
        error: 'Error loading'
      });
      const error = 'Error loading';

      actions$ = hot('-a-', { a: action });
      const response = cold('-#|', {}, { error });
      const expected = cold('--b', { b: fail });
      service.deleteProductCategory = jest.fn(() => response);

      expect(effects.deleteProductCategory$).toBeObservable(expected);
    });
  });

  describe('deleteSuccessProductCategory', () => {
    it('should return an ToasterActions.pop when productCategory delete success', () => {
      const id = 1;
      const toasterConfig = {
        type: 'success',
        title: 'translation',
        body: ''
      };

      const action = ProductCategoryApiActions.deleteProductCategorySuccess({
        id
      });

      ts.instant = jest.fn(() => 'translation');
      const pop = ToasterActions.pop({ params: toasterConfig });

      actions$ = hot('a', { a: action });
      const expected = cold('b', { b: pop });

      expect(effects.deleteSuccessProductCategory$).toBeObservable(expected);
    });
  });

  describe('failProductCategory$', () => {
    function productCategoryFailure(
      action:
        | typeof ProductCategoryApiActions.loadProductCategoryFailure
        | typeof ProductCategoryApiActions.updateProductCategoryFailure
        | typeof ProductCategoryApiActions.addProductCategoryFailure
        | typeof ProductCategoryApiActions.deleteProductCategoryFailure
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

      expect(effects.failProductCategory$).toBeObservable(expected);
    }

    it('should return an ToasterActions.pop when ProductCategoryApiActions.loadProductCategoryFailure', () => {
      const action = ProductCategoryApiActions.loadProductCategoryFailure;
      productCategoryFailure(action);
    });

    it('should return an ToasterActions.pop when ProductCategoryApiActions.updateProductCategoryFailure', () => {
      const action = ProductCategoryApiActions.updateProductCategoryFailure;
      productCategoryFailure(action);
    });

    it('should return an ToasterActions.pop when ProductCategoryApiActions.addProductCategoryFailure', () => {
      const action = ProductCategoryApiActions.addProductCategoryFailure;
      productCategoryFailure(action);
    });

    it('should return an ToasterActions.pop when ProductCategoryApiActions.deleteProductCategoryFailure', () => {
      const action = ProductCategoryApiActions.deleteProductCategoryFailure;
      productCategoryFailure(action);
    });
  });
});
