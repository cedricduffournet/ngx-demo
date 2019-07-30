import * as fromProductCategories from '@app/product-category/state/reducers';
import { User } from '@app/user/models/User';

describe('ProductCategoryReducer ', () => {
  const initialState: fromProductCategories.ProductCategoriesState = {
    collection: {
      ids: [1, 2, 3],
      adding: true,
      added: true,
      deleting: true,
      deleted: true,
      loading: true,
      loaded: true
    },
    productCategories: {
      entities: {
        1: {
          id: 1,
          name: 'Name 1'
        },
        2: {
          id: 2,
          name: 'Name 2'
        },
        3: {
          id: 3,
          name: 'Name 3'
        }
      },
      selectedId: 1,
      updating: true,
      updated: true
    }
  };

  describe('Selectors', () => {
    describe('getProductCategoryEntitiesState', () => {
      it('should return the productCategories state', () => {
        expect(
          fromProductCategories.getProductCategoryEntitiesState.projector(initialState)
        ).toStrictEqual({
          entities: {
            1: {
              id: 1,
              name: 'Name 1'
            },
            2: {
              id: 2,
              name: 'Name 2'
            },
            3: {
              id: 3,
              name: 'Name 3'
            }
          },
          selectedId: 1,
          updating: true,
          updated: true
        });
      });
    });

    describe('getProductCategoryEntities', () => {
      it('should return the productCategories entities', () => {
        expect(
          fromProductCategories.getProductCategoryEntities.projector(initialState.productCategories)
        ).toStrictEqual({
          1: {
            id: 1,
            name: 'Name 1'
          },
          2: {
            id: 2,
            name: 'Name 2'
          },
          3: {
            id: 3,
            name: 'Name 3'
          }
        });
      });
    });

    describe('getProductCategoryEntitiesUpdating', () => {
      it('should return the productCategories updating', () => {
        expect(
          fromProductCategories.getProductCategoryEntitiesUpdating.projector(
            initialState.productCategories
          )
        ).toBe(true);
      });
    });

    describe('getProductCategoryEntitiesUpdated', () => {
      it('should return the productCategories updated', () => {
        expect(
          fromProductCategories.getProductCategoryEntitiesUpdated.projector(
            initialState.productCategories
          )
        ).toBe(true);
      });
    });

    describe('getProductCategoryCollectionState', () => {
      it('should return the collection state', () => {
        expect(
          fromProductCategories.getProductCategoryCollectionState.projector(initialState)
        ).toStrictEqual({
          ids: [1, 2, 3],
          adding: true,
          added: true,
          deleting: true,
          deleted: true,
          loading: true,
          loaded: true
        });
      });
    });

    describe('getProductCategoryIds', () => {
      it('should return collection ids', () => {
        expect(
          fromProductCategories.getProductCategoryIds.projector(initialState.collection)
        ).toStrictEqual([1, 2, 3]);
      });
    });

    describe('getProductCategoryCollectionAdding', () => {
      it('should return  if collection adding', () => {
        expect(
          fromProductCategories.getProductCategoryCollectionAdding.projector(
            initialState.collection
          )
        ).toBe(true);
      });
    });

    describe('getProductCategoryCollectionAdded', () => {
      it('should return  if item in collection added', () => {
        expect(
          fromProductCategories.getProductCategoryCollectionAdded.projector(
            initialState.collection
          )
        ).toBe(true);
      });
    });

    describe('getProductCategoryCollectionDeleting', () => {
      it('should return the if collection deleting', () => {
        expect(
          fromProductCategories.getProductCategoryCollectionDeleting.projector(
            initialState.collection
          )
        ).toBe(true);
      });
    });

    describe('getProductCategoryCollectionDeleted', () => {
      it('should return the if item in collection deleted', () => {
        expect(
          fromProductCategories.getProductCategoryCollectionDeleted.projector(
            initialState.collection
          )
        ).toBe(true);
      });
    });

    describe('getProductCategories', () => {
      it('should return the productCategories', () => {
        expect(
          fromProductCategories.getProductCategories.projector(
            initialState.productCategories.entities,
            initialState.collection.ids
          )
        ).toStrictEqual([
          {
            id: 1,
            name: 'Name 1'
          },
          {
            id: 2,
            name: 'Name 2'
          },
          {
            id: 3,
            name: 'Name 3'
          }
        ]);
      });
    });

    describe('getSelectedProductCategoryId', () => {
      it('should return id of selected productCategory', () => {
        expect(
          fromProductCategories.getSelectedProductCategoryId.projector(
            initialState.productCategories
          )
        ).toBe(1);
      });
    });

    describe('getSelectedProductCategory', () => {
      it('should return selected productCategory', () => {
        expect(
          fromProductCategories.getSelectedProductCategory.projector(
            initialState.productCategories.entities,
            initialState.productCategories.selectedId
          )
        ).toStrictEqual({
          id: 1,
          name: 'Name 1'
        });
      });
    });

    describe('canUpdateProductCategory', () => {
      it('should return if can update productCategory', () => {
        expect(fromProductCategories.canUpdateProductCategory.projector(true)).toBe(true);
      });
    });

    describe('canDeleteProductCategory', () => {
      it('should return if can delete productCategory', () => {
        expect(fromProductCategories.canDeleteProductCategory.projector(true)).toBe(true);
      });
    });

    describe('canCreateProductCategory', () => {
      it('should return if can create productCategory', () => {
        expect(fromProductCategories.canCreateProductCategory.projector(true)).toBe(true);
      });
    });

    describe('getProductCategoryAuthorization', () => {
      it('should return productCategory authorization', () => {
        expect(
          fromProductCategories.getProductCategoryAuthorization.projector(true, true, false)
        ).toStrictEqual({
          update: true,
          delete: true,
          create: false
        });
      });
    });
  });
});
