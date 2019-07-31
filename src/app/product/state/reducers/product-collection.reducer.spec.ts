import { reducer } from '@app/product/state/reducers/product-collection.reducer';
import * as fromProducts from '@app/product/state/reducers/product-collection.reducer';

import {
  ProductListViewActions,
  ProductAddModalActions,
  ProductDeleteModalActions,
  ProductApiActions
} from '@app/product/state/actions';
import { Product } from '@app/product/models/product';

describe('ProductCollectionReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toMatchSnapshot();
    });
  });

  describe('LOAD', () => {
    it('should set loading to true', () => {
      const action = ProductListViewActions.loadProducts();
      const result = reducer(fromProducts.INITIAL_STATE, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('LOAD_SUCCESS ', () => {
    it('should set loading to false, loaded to true and set product ids [1, 2]', () => {
      const initialState = {
        ...fromProducts.INITIAL_STATE,
        loading: true
      };

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
      const action = ProductApiActions.loadProductSuccess({
        products
      });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('LOAD_FAILURE ', () => {
    const initialState = {
      ...fromProducts.INITIAL_STATE,
      loading: true
    };

    it('should set loading to false, loaded to false', () => {
      const error = {
        message: 'error'
      };
      const action = ProductApiActions.loadProductFailure({ error });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('ADD', () => {
    it('should set adding to true on ProductAddModalActions.addProduct', () => {
      const product = {
        name: 'AddName'
      } as Product;
      const action = ProductAddModalActions.addProduct({
        product
      });
      const result = reducer(fromProducts.INITIAL_STATE, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('ADD_SUCCESS', () => {
    it('should set adding to false, added to true and add new product (3) to ids', () => {
      const initialState = {
        ...fromProducts.INITIAL_STATE,
        adding: true,
        ids: [1, 2]
      };
      const product = {
        entities: {
          3: {
            name: 'AddName'
          }
        },
        result: 3
      };
      const action = ProductApiActions.addProductSuccess({
        product
      });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('ADD_FAILURE & SHOW_MODAL_ADD', () => {
    const initialState = {
      ...fromProducts.INITIAL_STATE,
      adding: true,
      added: true
    };

    it('should set adding to false, added to false', () => {
      const error = {
        message: 'error'
      };
      const action = ProductApiActions.addProductFailure({ error });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });

    it('should set adding to false on ProductListViewActions.showAddProductModal', () => {
      const action = ProductListViewActions.showAddProductModal();
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('DELETE', () => {
    it('should set deleting to true', () => {
      const product = {
        id: 1,
        name: 'RemoveName'
      };
      const action = ProductDeleteModalActions.deleteProduct({
        product
      });
      const result = reducer(fromProducts.INITIAL_STATE, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('DELETE_SUCCESS', () => {
    const initialState = {
      ...fromProducts.INITIAL_STATE,
      removing: true,
      ids: [1, 2]
    };

    it('should set deleting to false, deleted to true and remove civproductility (1) form ids', () => {
      const id = 1;

      const action = ProductApiActions.deleteProductSuccess({
        id
      });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('DELETE_FAILURE & SHOW_MODAL_DELETE', () => {
    const initialState = {
      ...fromProducts.INITIAL_STATE,
      removing: true,
      removed: true
    };

    it('should set removing to false, remove to false', () => {
      const error = {
        message: 'error'
      };
      const action = ProductApiActions.deleteProductFailure({ error });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });

    it('should set removing to false, remove to false on ProductListViewActions.showDeleteProductModal', () => {
      const action = ProductListViewActions.showDeleteProductModal();
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    describe('getIds', () => {
      it('should retrieve ids [1,2,3]', () => {
        const result = fromProducts.getIds({
          ...fromProducts.INITIAL_STATE,
          ids: [1, 2, 3]
        });
        expect(result).toMatchSnapshot();
      });
    });

    describe('getDeleting', () => {
      it('should retrieve removing false', () => {
        const result = fromProducts.getDeleting({
          ...fromProducts.INITIAL_STATE,
          deleting: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve removing true', () => {
        const result = fromProducts.getDeleting({
          ...fromProducts.INITIAL_STATE,
          deleting: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getDeleted', () => {
      it('should retrieve deleted false', () => {
        const result = fromProducts.getDeleted({
          ...fromProducts.INITIAL_STATE,
          deleted: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve deleted true', () => {
        const result = fromProducts.getDeleted({
          ...fromProducts.INITIAL_STATE,
          deleted: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getAdding', () => {
      it('should retrieve adding false', () => {
        const result = fromProducts.getAdding({
          ...fromProducts.INITIAL_STATE,
          adding: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve adding true', () => {
        const result = fromProducts.getAdding({
          ...fromProducts.INITIAL_STATE,
          adding: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getAdded', () => {
      it('should retrieve added false', () => {
        const result = fromProducts.getAdded({
          ...fromProducts.INITIAL_STATE,
          added: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve added true', () => {
        const result = fromProducts.getAdded({
          ...fromProducts.INITIAL_STATE,
          added: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getLoaded', () => {
      it('should retrieve loaded false', () => {
        const result = fromProducts.getLoaded({
          ...fromProducts.INITIAL_STATE,
          loaded: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve loaded true', () => {
        const result = fromProducts.getLoaded({
          ...fromProducts.INITIAL_STATE,
          loaded: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getLoading', () => {
      it('should retrieve loading false', () => {
        const result = fromProducts.getLoading({
          ...fromProducts.INITIAL_STATE,
          loading: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve loading true', () => {
        const result = fromProducts.getLoading({
          ...fromProducts.INITIAL_STATE,
          loading: true
        });

        expect(result).toMatchSnapshot();
      });
    });
  });
});
