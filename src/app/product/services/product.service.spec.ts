import { TestBed } from '@angular/core/testing';

import { cold } from 'jasmine-marbles';
import { normalize } from 'normalizr';

import { ProductService } from '@app/product/services';
import { productSchema, Product } from '@app/product/models/product';
import { HttpService } from '@app/core/services/http.service';

describe('ProductService', () => {
  let service: ProductService;
  let http: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            getPublic: jest.fn(),
            put: jest.fn(),
            post: jest.fn(),
            delete: jest.fn()
          }
        },
        ProductService
      ]
    });

    service = TestBed.get(ProductService);
    http = TestBed.get(HttpService);
  });

  it('should retrieve product collection', () => {
    const products = [
      {
        id: 1,
        name: 'name 1'
      },
      {
        id: 1,
        name: 'name 2'
      }
    ];

    const meta = {
    };

    const config = {
      page: 1,
      itemsPerPage: 10
    };

    const productsNormalized = normalize(products, [productSchema]);
    const response = cold('-a|', { a:  { data: products, meta }});
    const expected = cold('-b|', { b: {products: productsNormalized, meta }});
    const params = service.toHttpParams(config);

    http.get = jest.fn(() => response);

    expect(service.loadProducts(config)).toBeObservable(expected);
    expect(http.get).toHaveBeenCalledWith('/products', params);
  });

  it('should update product, and return product updated', () => {
    const product = {
      name: 'name 1'
    } as Product;
    const id = 1;
    const data = {
      id,
      product: {
        name: product.name
      }
    };
    const productNormalized = normalize(
      { id, name: product.name },
      productSchema
    );

    const response = cold('-a|', {
      a: { id, name: product.name }
    });
    const expected = cold('-b|', { b: productNormalized });
    http.put = jest.fn(() => response);

    expect(service.updateProduct(data)).toBeObservable(expected);
    expect(http.put).toHaveBeenCalledWith(`/products/${id}`, data.product);
  });

  it('should add product, and return product added', () => {
    const product = {
      name: 'name 1'
    } as Product;

    const productNormalized = normalize(product, productSchema);

    const response = cold('-a|', { a: product });
    const expected = cold('-b|', { b: productNormalized });
    http.post = jest.fn(() => response);

    expect(service.addProduct(product)).toBeObservable(expected);
    expect(http.post).toHaveBeenCalledWith(`/products`, product);
  });

  it('should remove product, and return remove id', () => {
    const product = {
      id: 1,
      name: 'name 1'
    } as Product;

    const response = cold('-a|', { a: {} });
    const expected = cold('-b|', { b: product.id });
    http.delete = jest.fn(() => response);

    expect(service.deleteProduct(product)).toBeObservable(expected);
    expect(http.delete).toHaveBeenCalledWith(`/products/${product.id}`);
  });
});
