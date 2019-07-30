import { TestBed, ComponentFixture } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import {
  ProductCategoryItemComponent,
  ProductCategoryItemsComponent
} from '@app/product-category/components';
import { ProductCategoryListViewComponent } from '@app/product-category/containers';
import * as fromProductCategories from '@app/product-category/state/reducers';
import { ProductCategoryListViewActions } from '@app/product-category/state/actions';
import { SharedModule } from '@app/shared/shared.module';

describe('ProductCategoryListViewComponent', () => {
  let fixture: ComponentFixture<ProductCategoryListViewComponent>;
  let component: ProductCategoryListViewComponent;
  let store: MockStore<fromProductCategories.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductCategoryListViewComponent,
        ProductCategoryItemsComponent,
        ProductCategoryItemComponent
      ],
      imports: [SharedModule, TranslateModule.forRoot()],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: fromProductCategories.getProductCategories,
              value: []
            },
            {
              selector: fromProductCategories.getProductCategoryAuthorization,
              value: {
                create: true,
                delete: true,
                update: true
              }
            }
          ]
        })
      ]
    });

    fixture = TestBed.createComponent(ProductCategoryListViewComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch loadProductCategories on init', () => {
    const action = ProductCategoryListViewActions.loadProductCategories();
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch showAddProductCategoryModal on add event', () => {
    const action = ProductCategoryListViewActions.showAddProductCategoryModal();
    component.onAdd();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch showUpdateProductCategoryModal on update event', () => {
    const action = ProductCategoryListViewActions.showUpdateProductCategoryModal();
    component.onUpdate(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch selectProductCategory on update event', () => {
    const action = ProductCategoryListViewActions.selectProductCategory({ id: 1 });
    component.onUpdate(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch showDeleteProductCategoryModal on update event', () => {
    const action = ProductCategoryListViewActions.showDeleteProductCategoryModal();
    component.onDelete(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch selectProductCategory on deletee event', () => {
    const action = ProductCategoryListViewActions.selectProductCategory({ id: 1 });
    component.onDelete(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
