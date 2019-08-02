import { reducer } from '@app/product-category/state/reducers/product-category-collection.reducer';
import * as fromProductCategories from '@app/product-category/state/reducers/product-category-collection.reducer';

import {
  ProductCategoryListViewActions,
  ProductCategoryAddModalActions,
  ProductCategoryDeleteModalActions,
  ProductCategoryApiActions
} from '@app/product-category/state/actions';
import { ProductCategory } from '@app/product-category/models/product-category';

describe('ProductCategoryCollectionReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toMatchSnapshot();
    });
  });

  describe('LOAD', () => {
    it('should set loading to true', () => {
      const action = ProductCategoryListViewActions.loadProductCategories();
      const result = reducer(fromProductCategories.INITIAL_STATE, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('LOAD_SUCCESS ', () => {
    it('should set loading to false, loaded to true and set productCategory ids [1, 2]', () => {
      const initialState = {
        ...fromProductCategories.INITIAL_STATE,
        loading: true
      };

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

      const action = ProductCategoryApiActions.loadProductCategorySuccess({
        productCategories
      });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('LOAD_FAILURE ', () => {
    const initialState = {
      ...fromProductCategories.INITIAL_STATE,
      loading: true
    };

    it('should set loading to false, loaded to false', () => {
      const error = {
        message: 'error'
      };
      const action = ProductCategoryApiActions.loadProductCategoryFailure({ error });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('ADD', () => {
    it('should set adding to true on ProductCategoryAddModalActions.addProductCategory', () => {
      const productCategory = {
        name: 'AddName'
      } as ProductCategory;
      const action = ProductCategoryAddModalActions.addProductCategory({
        productCategory
      });
      const result = reducer(fromProductCategories.INITIAL_STATE, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('ADD_SUCCESS', () => {
    it('should set adding to false, added to true and add new productCategory (3) to ids', () => {
      const initialState = {
        ...fromProductCategories.INITIAL_STATE,
        adding: true,
        ids: [1, 2]
      };
      const productCategory = {
        entities: {
          3: {
            name: 'AddName'
          }
        },
        result: 3
      };
      const action = ProductCategoryApiActions.addProductCategorySuccess({
        productCategory
      });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('ADD_FAILURE & SHOW_MODAL_ADD', () => {
    const initialState = {
      ...fromProductCategories.INITIAL_STATE,
      adding: true,
      added: true
    };

    it('should set adding to false, added to false', () => {
      const error = {
        message: 'error'
      };
      const action = ProductCategoryApiActions.addProductCategoryFailure({ error });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });

    it('should set adding to false on ProductCategoryListViewActions.showAddProductCategoryModal', () => {
      const action = ProductCategoryListViewActions.showAddProductCategoryModal();
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('DELETE', () => {
    it('should set deleting to true', () => {
      const productCategory = {
        id: 1,
        name: 'RemoveName'
      } as ProductCategory;
      const action = ProductCategoryDeleteModalActions.deleteProductCategory({
        productCategory
      });
      const result = reducer(fromProductCategories.INITIAL_STATE, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('DELETE_SUCCESS', () => {
    const initialState = {
      ...fromProductCategories.INITIAL_STATE,
      removing: true,
      ids: [1, 2]
    };

    it('should set deleting to false, deleted to true and remove civproductCategoryility (1) form ids', () => {
      const id = 1;

      const action = ProductCategoryApiActions.deleteProductCategorySuccess({
        id
      });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('DELETE_FAILURE & SHOW_MODAL_DELETE', () => {
    const initialState = {
      ...fromProductCategories.INITIAL_STATE,
      removing: true,
      removed: true
    };

    it('should set removing to false, remove to false', () => {
      const error = {
        message: 'error'
      };
      const action = ProductCategoryApiActions.deleteProductCategoryFailure({ error });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });

    it('should set removing to false, remove to false on ProductCategoryListViewActions.showDeleteProductCategoryModal', () => {
      const action = ProductCategoryListViewActions.showDeleteProductCategoryModal();
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    describe('getIds', () => {
      it('should retrieve ids [1,2,3]', () => {
        const result = fromProductCategories.getIds({
          ...fromProductCategories.INITIAL_STATE,
          ids: [1, 2, 3]
        });
        expect(result).toMatchSnapshot();
      });
    });

    describe('getDeleting', () => {
      it('should retrieve removing false', () => {
        const result = fromProductCategories.getDeleting({
          ...fromProductCategories.INITIAL_STATE,
          deleting: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve removing true', () => {
        const result = fromProductCategories.getDeleting({
          ...fromProductCategories.INITIAL_STATE,
          deleting: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getDeleted', () => {
      it('should retrieve deleted false', () => {
        const result = fromProductCategories.getDeleted({
          ...fromProductCategories.INITIAL_STATE,
          deleted: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve deleted true', () => {
        const result = fromProductCategories.getDeleted({
          ...fromProductCategories.INITIAL_STATE,
          deleted: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getAdding', () => {
      it('should retrieve adding false', () => {
        const result = fromProductCategories.getAdding({
          ...fromProductCategories.INITIAL_STATE,
          adding: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve adding true', () => {
        const result = fromProductCategories.getAdding({
          ...fromProductCategories.INITIAL_STATE,
          adding: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getAdded', () => {
      it('should retrieve added false', () => {
        const result = fromProductCategories.getAdded({
          ...fromProductCategories.INITIAL_STATE,
          added: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve added true', () => {
        const result = fromProductCategories.getAdded({
          ...fromProductCategories.INITIAL_STATE,
          added: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getLoaded', () => {
      it('should retrieve loaded false', () => {
        const result = fromProductCategories.getLoaded({
          ...fromProductCategories.INITIAL_STATE,
          loaded: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve loaded true', () => {
        const result = fromProductCategories.getLoaded({
          ...fromProductCategories.INITIAL_STATE,
          loaded: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getLoading', () => {
      it('should retrieve loading false', () => {
        const result = fromProductCategories.getLoading({
          ...fromProductCategories.INITIAL_STATE,
          loading: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve loading true', () => {
        const result = fromProductCategories.getLoading({
          ...fromProductCategories.INITIAL_STATE,
          loading: true
        });

        expect(result).toMatchSnapshot();
      });
    });
  });
});
