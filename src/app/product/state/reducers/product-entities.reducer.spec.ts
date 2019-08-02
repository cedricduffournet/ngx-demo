import { reducer } from '@app/product/state/reducers/product-entities.reducer';
import * as fromProducts from '@app/product/state/reducers/product-entities.reducer';

import {
  ProductListViewActions,
  ProductUpdateModalActions,
  ProductApiActions
} from '@app/product/state/actions';
import { Product } from '@app/product/models/product';

describe('ProductEntitiesReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toMatchSnapshot();
    });
  });

  describe('LOAD_SUCCESS', () => {
    it('should return state with product entities', () => {
      const products = {
        entities: {
          products: {
            1: {
              name: 'Name1'
            } as Product,
            2: {
              name: 'Name2'
            } as Product
          }
        },
        result: [1, 2]
      };

      const meta = {
      };

      const action = ProductApiActions.loadProductSuccess({
        products,
        meta
      });
      const result = reducer(fromProducts.INITIAL_STATE, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('UPDATE', () => {
    const id = 1;
    const product = {
      name: 'NameUpdated'
    } as Product;
    const data = { id, product };

    it('should set updating to true', () => {
      const action = ProductUpdateModalActions.updateProduct({ data });
      const result = reducer(fromProducts.INITIAL_STATE, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('UPDATE_SUCCESS', () => {
    it('should update product id 1, upated should be true and updating false', () => {
      const products = {
        1: {
          id: 1,
          name: 'Name 1'
        } as Product,
        2: {
          id: 2,
          name: 'Name 2'
        } as Product
      };
      const initialState = {
        ...fromProducts.INITIAL_STATE,
        entities: products
      };

      const product = {
        entities: {
          products: {
            1: {
              name: 'Name 1 updated'
            }
          }
        },
        result: 1
      };
      const action = ProductApiActions.updateProductSuccess({ product });
      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('UPDATE_FAILURE & SHOW_MODAL_UPDATE', () => {
    const initialState = {
      ...fromProducts.INITIAL_STATE,
      updating: true,
      updated: true,
      entities: {
        1: {
          id: 1,
          name: 'Name'
        } as Product
      }
    };

    it('should set updating to false', () => {
      const error = {
        message: 'error'
      };
      const action = ProductApiActions.updateProductFailure({ error });
      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });

    it('should set updating to false, updated to false when show modal', () => {
      const action = ProductListViewActions.showUpdateProductModal();
      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('ADD_SUCCESS', () => {
    const products = {
      1: {
        id: 1,
        name: 'Name 1'
      } as Product,
      2: {
        id: 2,
        name: 'Name 2'
      } as Product
    };
    const initialState = {
      ...fromProducts.INITIAL_STATE,
      entities: products
    };

    const product = {
      entities: {
        products: {
          3: {
            name: 'Name 3'
          }
        }
      },
      result: 3
    };

    it('should add a new product id 3', () => {
      const action = ProductApiActions.addProductSuccess({ product });
      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('SELECT', () => {
    const products = {
      1: {
        id: 1,
        name: 'Name 1'
      } as Product,
      2: {
        id: 2,
        name: 'Name 2'
      } as Product
    };
    const initialState = {
      ...fromProducts.INITIAL_STATE,
      entities: products
    };

    const id = 1;

    it('should set selected product (id 1)', () => {
      const action = ProductListViewActions.selectProduct({ id });
      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    describe('getEntities', () => {
      it('should return entities', () => {
        const result = fromProducts.getEntities({
          ...fromProducts.INITIAL_STATE,
          entities: {
            1: {
              id: 1,
              name: 'Name 1'
            } as Product,
            2: {
              id: 2,
              name: 'Name 2'
            } as Product
          }
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getSelectedId', () => {
      it('should return selected id (1)', () => {
        const result = fromProducts.getSelectedId({
          ...fromProducts.INITIAL_STATE,
          selectedId: 1
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getUpdating', () => {
      it('should return updating true', () => {
        const result = fromProducts.getUpdating({
          ...fromProducts.INITIAL_STATE,
          updating: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getUpdated', () => {
      it('should return updated true', () => {
        const result = fromProducts.getUpdated({
          ...fromProducts.INITIAL_STATE,
          updated: true
        });

        expect(result).toMatchSnapshot();
      });
    });
  });
});
