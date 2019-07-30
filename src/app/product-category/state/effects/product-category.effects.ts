import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { switchMap, map, catchError, mergeMap, tap } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';
import {
  ProductCategoryUpdateModalComponent,
  ProductCategoryAddModalComponent,
  ProductCategoryDeleteModalComponent
} from '@app/product-category/containers';
import { Observable, of } from 'rxjs';

import {
  ProductCategoryApiActions,
  ProductCategoryListViewActions,
  ProductCategoryUpdateModalActions,
  ProductCategoryAddModalActions,
  ProductCategoryDeleteModalActions
} from '@app/product-category/state/actions';

import { ToasterActions } from '@app/core/state/actions';

import { ProductCategoryService } from '@app/product-category/services';
import { CRUD_MODAL_CONFIG } from '@app/shared/models/modal-config';

@Injectable()
export class ProductCategoryEffects {
  public constructor(
    private actions$: Actions,
    private service: ProductCategoryService,
    private ts: TranslateService,
    private modalService: BsModalService
  ) {}
  loadProductCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ProductCategoryListViewActions.loadProductCategories
      ),
      switchMap(() => {
        return this.service.loadProductCategories().pipe(
          map(productCategories => {
            return ProductCategoryApiActions.loadProductCategorySuccess({ productCategories });
          }),
          catchError(error =>
            of(
              ProductCategoryApiActions.loadProductCategoryFailure({
                error: error.error
              })
            )
          )
        );
      })
    )
  );

  addProductCategoryModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductCategoryListViewActions.showAddProductCategoryModal),
        tap(() => {
          this.modalService.show(ProductCategoryAddModalComponent, CRUD_MODAL_CONFIG);
        })
      ),
    { dispatch: false }
  );

  addProductCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductCategoryAddModalActions.addProductCategory),
      map(action => action.productCategory),
      mergeMap(productCategory =>
        this.service.addProductCategory(productCategory).pipe(
          map(result =>
            ProductCategoryApiActions.addProductCategorySuccess({ productCategory: result })
          ),
          catchError(error =>
            of(ProductCategoryApiActions.addProductCategoryFailure({ error: error.error }))
          )
        )
      )
    )
  );

  updateProductCategoryModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductCategoryListViewActions.showUpdateProductCategoryModal),
        tap(() => {
          this.modalService.show(
            ProductCategoryUpdateModalComponent,
            CRUD_MODAL_CONFIG
          );
        })
      ),
    { dispatch: false }
  );

  updateProductCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductCategoryUpdateModalActions.updateProductCategory),
      map(action => action.data),
      mergeMap(data =>
        this.service.updateProductCategory(data).pipe(
          map(result =>
            ProductCategoryApiActions.updateProductCategorySuccess({ productCategory: result })
          ),
          catchError(error =>
            of(
              ProductCategoryApiActions.updateProductCategoryFailure({
                error: error.error
              })
            )
          )
        )
      )
    )
  );

  deleteProductCategoryModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductCategoryListViewActions.showDeleteProductCategoryModal),
        tap(() => {
          this.modalService.show(
            ProductCategoryDeleteModalComponent,
            CRUD_MODAL_CONFIG
          );
        })
      ),
    { dispatch: false }
  );

  deleteProductCategory$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductCategoryDeleteModalActions.deleteProductCategory),
      map(action => action.productCategory),
      mergeMap(productCategory =>
        this.service.deleteProductCategory(productCategory).pipe(
          map(() =>
            ProductCategoryApiActions.deleteProductCategorySuccess({
              id: productCategory.id
            })
          ),
          catchError(error =>
            of(
              ProductCategoryApiActions.deleteProductCategoryFailure({
                error: error.error
              })
            )
          )
        )
      )
    )
  );

  /************
   * Toater
   ************/

  addSuccessProductCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductCategoryApiActions.addProductCategorySuccess),
      map(() => {
        return ToasterActions.pop({
          params: {
            type: 'success',
            title: this.ts.instant('PRODUCT_CATEGORY_ADD_SUCCESS'),
            body: ''
          }
        });
      })
    )
  );

  updateSuccessProductCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductCategoryApiActions.updateProductCategorySuccess),
      map(() =>
        ToasterActions.pop({
          params: {
            type: 'success',
            title: this.ts.instant('PRODUCT_CATEGORY_UPDATE_SUCCESS'),
            body: ''
          }
        })
      )
    )
  );

  deleteSuccessProductCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductCategoryApiActions.deleteProductCategorySuccess),
      map(() =>
        ToasterActions.pop({
          params: {
            type: 'success',
            title: this.ts.instant('PRODUCT_CATEGORY_DELETE_SUCCESS'),
            body: ''
          }
        })
      )
    )
  );

  failProductCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ProductCategoryApiActions.loadProductCategoryFailure,
        ProductCategoryApiActions.updateProductCategoryFailure,
        ProductCategoryApiActions.addProductCategoryFailure,
        ProductCategoryApiActions.deleteProductCategoryFailure
      ),
      map(action => action.error),
      map(error =>
        ToasterActions.pop({
          params: {
            type: 'error',
            title: error.message,
            body: ''
          }
        })
      )
    )
  );
}
