import { Injectable } from '@angular/core';

import { normalize } from 'normalizr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product, productSchema } from '@app/product/models/product';
import { HttpService } from '@app/core/services/http.service';
import { NormalizedData } from '@app/shared/models/normalized.model';
import { PaginatedResult } from '@app/shared/models/paginated-result';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private path = '/products';

  public constructor(private httpService: HttpService) {}
  public loadProducts(): Observable<NormalizedData> {
    return this.httpService.get<PaginatedResult<Product>>(this.path).pipe(
      map(res => {
        // return normalize(res.data, [productSchema]);
        const test = normalize(res.data, [productSchema]);
        console.log(test);
        return test;
      })
    );
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
}
