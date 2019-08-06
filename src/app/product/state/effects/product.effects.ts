import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Action } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import {
  switchMap,
  map,
  catchError,
  mergeMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';
import {
  ProductUpdateModalComponent,
  ProductDeleteModalComponent
} from '@app/product/containers';
import { Observable, of } from 'rxjs';

import {
  ProductApiActions,
  ProductListViewActions,
  ProductUpdateModalActions,
  ProductAddModalActions,
  ProductDeleteModalActions
} from '@app/product/state/actions';
import { ToasterActions } from '@app/core/state/actions';
import { ProductService } from '@app/product/services';
import { ProductFacade } from '@app/product/state/product.facade';
import { CRUD_MODAL_CONFIG } from '@app/shared/models/modal-config';

@Injectable()
export class ProductEffects {
  public constructor(
    private actions$: Actions,
    private service: ProductService,
    private ts: TranslateService,
    private modalService: BsModalService,
    private facade: ProductFacade,
    private router: Router
  ) {}

  changePage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductListViewActions.changePage),
      map(() => ProductListViewActions.loadProducts())
    )
  );

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductListViewActions.loadProducts),
      withLatestFrom(this.facade.config$),
      switchMap(([_, config]) => {
        return this.service.loadProducts(config).pipe(
          map(results => {
            return ProductApiActions.loadProductSuccess({
              products: results.products,
              meta: results.meta
            });
          }),
          catchError(error =>
            of(
              ProductApiActions.loadProductFailure({
                error: error.error
              })
            )
          )
        );
      })
    )
  );

  navigateToAddProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductListViewActions.navigateToAddProduct),
        tap(() => {
          this.router.navigate(['parameters/products/new']);
        })
      ),
    { dispatch: false }
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductAddModalActions.addProduct),
      map(action => action.product),
      mergeMap(product =>
        this.service.addProduct(product).pipe(
          map(result =>
            ProductApiActions.addProductSuccess({ product: result })
          ),
          tap(action => this.router.navigate([`parameters/products/${action.product.result}`])),
          catchError(error =>
            of(ProductApiActions.addProductFailure({ error: error.error }))
          )
        )
      )
    )
  );

  navigateToSelectedProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductListViewActions.navigateToSelectedProduct),
        withLatestFrom(this.facade.selectedId$),
        tap(([_, id]) => {
          this.router.navigate(['parameters/products/' + id]);
        })
      ),
    { dispatch: false }
  );

  updateProductModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductListViewActions.showUpdateProductModal),
        tap(() => {
          this.modalService.show(ProductUpdateModalComponent, {
            ...CRUD_MODAL_CONFIG,
            class: 'modal-lg'
          });
        })
      ),
    { dispatch: false }
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductUpdateModalActions.updateProduct),
      map(action => action.data),
      mergeMap(data =>
        this.service.updateProduct(data).pipe(
          map(result =>
            ProductApiActions.updateProductSuccess({ product: result })
          ),
          catchError(error =>
            of(
              ProductApiActions.updateProductFailure({
                error: error.error
              })
            )
          )
        )
      )
    )
  );

  deleteProductModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductListViewActions.showDeleteProductModal),
        tap(() => {
          this.modalService.show(
            ProductDeleteModalComponent,
            CRUD_MODAL_CONFIG
          );
        })
      ),
    { dispatch: false }
  );

  deleteProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductDeleteModalActions.deleteProduct),
      map(action => action.product),
      mergeMap(product =>
        this.service.deleteProduct(product).pipe(
          map(() =>
            ProductApiActions.deleteProductSuccess({
              id: product.id
            })
          ),
          tap(() => this.router.navigate(['parameters/products'])),
          catchError(error =>
            of(
              ProductApiActions.deleteProductFailure({
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

  addSuccessProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductApiActions.addProductSuccess),
      map(() => {
        return ToasterActions.pop({
          params: {
            type: 'success',
            title: this.ts.instant('PRODUCT_ADD_SUCCESS'),
            body: ''
          }
        });
      })
    )
  );

  updateSuccessProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductApiActions.updateProductSuccess),
      map(() =>
        ToasterActions.pop({
          params: {
            type: 'success',
            title: this.ts.instant('PRODUCT_UPDATE_SUCCESS'),
            body: ''
          }
        })
      )
    )
  );

  deleteSuccessProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductApiActions.deleteProductSuccess),
      map(() =>
        ToasterActions.pop({
          params: {
            type: 'success',
            title: this.ts.instant('PRODUCT_DELETE_SUCCESS'),
            body: ''
          }
        })
      )
    )
  );

  failProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ProductApiActions.loadProductFailure,
        ProductApiActions.updateProductFailure,
        ProductApiActions.addProductFailure,
        ProductApiActions.deleteProductFailure
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
