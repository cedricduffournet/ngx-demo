import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { ProductDetailsViewComponent } from '@app/product/containers';
import { ProductDetailsActions } from '@app/product/state/actions';
import * as fromProducts from '@app/product/state/reducers';
import { Store } from '@ngrx/store';

@Component({ selector: 'app-product-selected', template: '' })
class ProductSelectedStubComponent {}

describe('ProductDetailsView', () => {
  let fixture: ComponentFixture<ProductDetailsViewComponent>;
  let component: ProductDetailsViewComponent;
  let activatedRoute: ActivatedRoute;
  let store: MockStore<fromProducts.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductSelectedStubComponent, ProductDetailsViewComponent],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: { params: new BehaviorSubject({}) }
        }
      ]
    });

    fixture = TestBed.createComponent(ProductDetailsViewComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.get(ActivatedRoute);
    store = TestBed.get(Store);
    jest.spyOn(store, 'dispatch');
  });

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a ProductDetailsActions.selectProduct action on init', () => {
    fixture.detectChanges();
    const action = ProductDetailsActions.selectProduct({ id: 1 });

    (activatedRoute.params as BehaviorSubject<any>).next({ id: 1 });

    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });
});
