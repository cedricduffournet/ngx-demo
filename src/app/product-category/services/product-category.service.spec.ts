import { TestBed } from '@angular/core/testing';

import { cold } from 'jasmine-marbles';
import { normalize } from 'normalizr';

import { ProductCategoryService } from '@app/product-category/services';
import { productCategorySchema, ProductCategory } from '@app/product-category/models/product-category';
import { HttpService } from '@app/core/services/http.service';

describe('ProductCategoryService', () => {
  let service: ProductCategoryService;
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
        ProductCategoryService
      ]
    });

    service = TestBed.get(ProductCategoryService);
    http = TestBed.get(HttpService);
  });

  it('should retrieve productCategory collection', () => {
    const productCategories = [
      {
        id: 1,
        name: 'name 1'
      },
      {
        id: 1,
        name: 'name 2'
      }
    ];

    const productCategoriesNormalized = normalize(productCategories, [productCategorySchema]);
    const response = cold('-a|', { a: productCategories });
    const expected = cold('-b|', { b: productCategoriesNormalized });

    http.get = jest.fn(() => response);

    expect(service.loadProductCategories()).toBeObservable(expected);
    expect(http.get).toHaveBeenCalledWith('/productcategories');
  });

  it('should update productCategory, and return productCategory updated', () => {
    const productCategory = {
      name: 'name 1'
    } as ProductCategory;
    const id = 1;
    const data = {
      id,
      productCategory: {
        name: productCategory.name
      }
    };
    const productCategoryNormalized = normalize(
      { id, name: productCategory.name },
      productCategorySchema
    );

    const response = cold('-a|', {
      a: { id, name: productCategory.name }
    });
    const expected = cold('-b|', { b: productCategoryNormalized });
    http.put = jest.fn(() => response);

    expect(service.updateProductCategory(data)).toBeObservable(expected);
    expect(http.put).toHaveBeenCalledWith(`/productcategories/${id}`, data.productCategory);
  });

  it('should add productCategory, and return productCategory added', () => {
    const productCategory = {
      name: 'name 1'
    } as ProductCategory;

    const productCategoryNormalized = normalize(productCategory, productCategorySchema);

    const response = cold('-a|', { a: productCategory });
    const expected = cold('-b|', { b: productCategoryNormalized });
    http.post = jest.fn(() => response);

    expect(service.addProductCategory(productCategory)).toBeObservable(expected);
    expect(http.post).toHaveBeenCalledWith(`/productcategories`, productCategory);
  });

  it('should remove productCategory, and return remove id', () => {
    const productCategory = {
      id: 1,
      name: 'name 1'
    } as ProductCategory;

    const response = cold('-a|', { a: {} });
    const expected = cold('-b|', { b: productCategory.id });
    http.delete = jest.fn(() => response);

    expect(service.deleteProductCategory(productCategory)).toBeObservable(expected);
    expect(http.delete).toHaveBeenCalledWith(`/productcategories/${productCategory.id}`);
  });
});
