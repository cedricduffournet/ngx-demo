import * as fromProducts from '@app/product/state/reducers';

describe('ProductReducer ', () => {
  const initialState: fromProducts.ProductsState = {
    collection: {
      ids: [1, 2, 3],
      adding: true,
      added: true,
      deleting: true,
      deleted: true,
      loading: true,
      loaded: true,
      totalItems: 0,
      config: {
        page: 1,
        itemsPerPage: 10
      }
    },
    products: {
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
    describe('getProductEntitiesState', () => {
      it('should return the products state', () => {
        expect(
          fromProducts.getProductEntitiesState.projector(initialState)
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

    describe('getProductEntities', () => {
      it('should return the products entities', () => {
        expect(
          fromProducts.getProductEntities.projector(initialState.products)
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

    describe('getProductEntitiesUpdating', () => {
      it('should return the products updating', () => {
        expect(
          fromProducts.getProductEntitiesUpdating.projector(
            initialState.products
          )
        ).toBe(true);
      });
    });

    describe('getProductEntitiesUpdated', () => {
      it('should return the products updated', () => {
        expect(
          fromProducts.getProductEntitiesUpdated.projector(
            initialState.products
          )
        ).toBe(true);
      });
    });

    describe('getProductCollectionState', () => {
      it('should return the collection state', () => {
        expect(
          fromProducts.getProductCollectionState.projector(initialState)
        ).toStrictEqual({
          ids: [1, 2, 3],
          adding: true,
          added: true,
          deleting: true,
          deleted: true,
          loading: true,
          loaded: true,
          totalItems: 0,
          config: {
            page: 1,
            itemsPerPage: 10
          }
        });
      });
    });

    describe('getProductIds', () => {
      it('should return collection ids', () => {
        expect(
          fromProducts.getProductIds.projector(initialState.collection)
        ).toStrictEqual([1, 2, 3]);
      });
    });

    describe('getProductCollectionAdding', () => {
      it('should return  if collection adding', () => {
        expect(
          fromProducts.getProductCollectionAdding.projector(
            initialState.collection
          )
        ).toBe(true);
      });
    });

    describe('getProductCollectionAdded', () => {
      it('should return  if item in collection added', () => {
        expect(
          fromProducts.getProductCollectionAdded.projector(
            initialState.collection
          )
        ).toBe(true);
      });
    });

    describe('getProductCollectionDeleting', () => {
      it('should return the if collection deleting', () => {
        expect(
          fromProducts.getProductCollectionDeleting.projector(
            initialState.collection
          )
        ).toBe(true);
      });
    });

    describe('getProductCollectionDeleted', () => {
      it('should return the if item in collection deleted', () => {
        expect(
          fromProducts.getProductCollectionDeleted.projector(
            initialState.collection
          )
        ).toBe(true);
      });
    });

    describe('getProducts', () => {
      it('should return the products', () => {
        expect(
          fromProducts.getProducts.projector(
            initialState.products.entities,
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

    describe('getSelectedProductId', () => {
      it('should return id of selected product', () => {
        expect(
          fromProducts.getSelectedProductId.projector(
            initialState.products
          )
        ).toBe(1);
      });
    });

    describe('getSelectedProduct', () => {
      it('should return selected product', () => {
        expect(
          fromProducts.getSelectedProduct.projector(
            initialState.products.entities,
            initialState.products.selectedId
          )
        ).toStrictEqual({
          id: 1,
          name: 'Name 1'
        });
      });
    });
  });
});
