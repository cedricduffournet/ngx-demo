import { reducer } from '@app/product-category/state/reducers/product-category-entities.reducer';
import * as fromProductCategories from '@app/product-category/state/reducers/product-category-entities.reducer';

import {
  ProductCategoryListViewActions,
  ProductCategoryUpdateModalActions,
  ProductCategoryApiActions
} from '@app/product-category/state/actions';
import { ProductCategory } from '@app/product-category/models/product-category';

describe('ProductCategoryEntitiesReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toMatchSnapshot();
    });
  });

  describe('LOAD_SUCCESS', () => {
    it('should return state with productCategory entities', () => {
      const productCategories = {
        entities: {
          productCategories: {
            1: {
              name: 'Name1'
            },
            2: {
              name: 'Name2'
            }
          }
        },
        result: [1, 2]
      };
      const action = ProductCategoryApiActions.loadProductCategorySuccess({
        productCategories
      });
      const result = reducer(fromProductCategories.INITIAL_STATE, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('UPDATE', () => {
    const id = 1;
    const productCategory = {
      name: 'NameUpdated'
    } as ProductCategory;
    const data = { id, productCategory };

    it('should set updating to true', () => {
      const action = ProductCategoryUpdateModalActions.updateProductCategory({ data });
      const result = reducer(fromProductCategories.INITIAL_STATE, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('UPDATE_SUCCESS', () => {
    it('should update productCategory id 1, upated should be true and updating false', () => {
      const productCategories = {
        1: {
          id: 1,
          name: 'Name 1'
        },
        2: {
          id: 2,
          name: 'Name 2'
        }
      };
      const initialState = {
        ...fromProductCategories.INITIAL_STATE,
        entities: productCategories
      };

      const productCategory = {
        entities: {
          productCategories: {
            1: {
              name: 'Name 1 updated'
            }
          }
        },
        result: 1
      };
      const action = ProductCategoryApiActions.updateProductCategorySuccess({ productCategory });
      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('UPDATE_FAILURE & SHOW_MODAL_UPDATE', () => {
    const initialState = {
      ...fromProductCategories.INITIAL_STATE,
      updating: true,
      updated: true,
      entities: {
        1: {
          id: 1,
          name: 'Name'
        }
      }
    };

    it('should set updating to false', () => {
      const error = {
        message: 'error'
      };
      const action = ProductCategoryApiActions.updateProductCategoryFailure({ error });
      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });

    it('should set updating to false, updated to false when show modal', () => {
      const action = ProductCategoryListViewActions.showUpdateProductCategoryModal();
      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('ADD_SUCCESS', () => {
    const productCategories = {
      1: {
        id: 1,
        name: 'Name 1'
      },
      2: {
        id: 2,
        name: 'Name 2'
      }
    };
    const initialState = {
      ...fromProductCategories.INITIAL_STATE,
      entities: productCategories
    };

    const productCategory = {
      entities: {
        productCategories: {
          3: {
            name: 'Name 3'
          }
        }
      },
      result: 3
    };

    it('should add a new productCategory id 3', () => {
      const action = ProductCategoryApiActions.addProductCategorySuccess({ productCategory });
      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('SELECT', () => {
    const productCategories = {
      1: {
        id: 1,
        name: 'Name 1'
      },
      2: {
        id: 2,
        name: 'Name 2'
      }
    };
    const initialState = {
      ...fromProductCategories.INITIAL_STATE,
      entities: productCategories
    };

    const id = 1;

    it('should set selected productCategory (id 1)', () => {
      const action = ProductCategoryListViewActions.selectProductCategory({ id });
      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    describe('getEntities', () => {
      it('should return entities', () => {
        const result = fromProductCategories.getEntities({
          ...fromProductCategories.INITIAL_STATE,
          entities: {
            1: {
              id: 1,
              name: 'Name 1'
            },
            2: {
              id: 2,
              name: 'Name 2'
            }
          }
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getSelectedId', () => {
      it('should return selected id (1)', () => {
        const result = fromProductCategories.getSelectedId({
          ...fromProductCategories.INITIAL_STATE,
          selectedId: 1
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getUpdating', () => {
      it('should return updating true', () => {
        const result = fromProductCategories.getUpdating({
          ...fromProductCategories.INITIAL_STATE,
          updating: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getUpdated', () => {
      it('should return updated true', () => {
        const result = fromProductCategories.getUpdated({
          ...fromProductCategories.INITIAL_STATE,
          updated: true
        });

        expect(result).toMatchSnapshot();
      });
    });
  });
});
