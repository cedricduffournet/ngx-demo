import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { ProductService } from '@app/product/services/product.service';
import * as fromProducts from '@app/product/state/reducers';
import { ProductActions } from '@app/product/state/actions';

@Injectable()
export class ProductGuard implements CanActivate {
  public constructor(
    private store: Store<fromProducts.State>,
    private productService: ProductService
  ) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.productService.fetchProduct(route.params.id).pipe(
      map(productEntity =>
        ProductActions.loadProduct({ product: productEntity })
      ),
      tap(action => this.store.dispatch(action)),
      map(product => {
        return !!product;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }
}
