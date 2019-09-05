import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpClient } from '@angular/common/http';
import { normalize } from 'normalizr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product, productSchema } from '@app/product/models/product';
import { HttpService } from '@app/core/services/http.service';
import { NormalizedData } from '@app/shared/models/normalized.model';
import { PaginatedResult } from '@app/shared/models/paginated-result';
import { HttpParams } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private path = '/products';

  public constructor(private httpClient: HttpClient) {}

  public addImage(file: File): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const options = {
      reportProgress: true
    };

    const req = new HttpRequest(
      'POST',
      `${environment.apiHost}${environment.apiBasePath}/products/4/images`,
      formData,
      options
    );

    return this.httpClient.request(req);
  }
}
