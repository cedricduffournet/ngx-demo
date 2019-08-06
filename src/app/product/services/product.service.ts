import { Injectable } from '@angular/core';

import { normalize } from 'normalizr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product, productSchema } from '@app/product/models/product';
import { HttpService } from '@app/core/services/http.service';
import { NormalizedData } from '@app/shared/models/normalized.model';
import { PaginatedResult } from '@app/shared/models/paginated-result';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private path = '/products';

  public constructor(private httpService: HttpService) {}

  public loadProducts(
    config: any
  ): Observable<{ products: NormalizedData; meta: any }> {
    return this.httpService
      .get<PaginatedResult<Product>>(this.path, this.toHttpParams(config))
      .pipe(
        map(res => {
          return {
            products: normalize(res.data, [productSchema]),
            meta: res.meta
          };
        })
      );
  }

  public fetchProduct(id: number): Observable<NormalizedData> {
    return this.httpService
      .get<Product>(`${this.path}/${id}`)
      .pipe(map(res => normalize(res, productSchema)));
  }

  public updateProduct(data: any): Observable<NormalizedData> {
    return this.httpService
      .put<Product>(`${this.path}/${data.id}`, data.product)
      .pipe(map(res => normalize(res, productSchema)));
  }

  public addProduct(product: any): Observable<NormalizedData> {
    return this.httpService
      .post<Product>(this.path, product)
      .pipe(map(res => normalize(res, productSchema)));
  }

  public deleteProduct(product: Product): Observable<number | undefined> {
    return this.httpService
      .delete(`${this.path}/${product.id}`)
      .pipe(map(() => product.id));
  }

  public toHttpParams(params: any) {
    return Object.getOwnPropertyNames(params).reduce(
      (p, key) => p.set(key, params[key]),
      new HttpParams()
    );
  }
}
