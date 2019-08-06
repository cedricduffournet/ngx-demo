import { Injectable } from '@angular/core';

import { normalize } from 'normalizr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProductCategory, productCategorySchema } from '@app/product-category/models/product-category';
import { HttpService } from '@app/core/services/http.service';
import { NormalizedData } from '@app/shared/models/normalized.model';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private path = '/productcategories';

  public constructor(private httpService: HttpService) {}

  public loadProductCategories(): Observable<NormalizedData> {
    return this.httpService
      .get<ProductCategory[]>(this.path)
      .pipe(map(res => normalize(res, [productCategorySchema])));
  }

  public updateProductCategory(data: any): Observable<NormalizedData> {
    return this.httpService
      .put<ProductCategory>(`${this.path}/${data.id}`, data.productCategory)
      .pipe(map(res => normalize(res, productCategorySchema)));
  }

  public addProductCategory(productCategory: any): Observable<NormalizedData> {
    return this.httpService
      .post<ProductCategory>(this.path, productCategory)
      .pipe(map(res => normalize(res, productCategorySchema)));
  }

  public deleteProductCategory(productCategory: ProductCategory): Observable<number | undefined> {
    return this.httpService
      .delete(`${this.path}/${productCategory.id}`)
      .pipe(map(() => productCategory.id));
  }
}
