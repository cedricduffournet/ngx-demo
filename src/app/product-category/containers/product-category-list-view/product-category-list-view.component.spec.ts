import { TestBed, ComponentFixture } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import {
  ProductCategoryItemComponent,
  ProductCategoryItemsComponent
} from '@app/product-category/components';
import { ProductCategoryListViewComponent } from '@app/product-category/containers';
import { SharedModule } from '@app/shared/shared.module';
import { ProductCategoryFacade } from '@app/product-category/state/product-category.facade';
import { AuthFacade } from '@app/authentication/state/auth.facade';

describe('ProductCategoryListViewComponent', () => {
  let fixture: ComponentFixture<ProductCategoryListViewComponent>;
  let component: ProductCategoryListViewComponent;
  let facade: ProductCategoryFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductCategoryListViewComponent,
        ProductCategoryItemsComponent,
        ProductCategoryItemComponent
      ],
      imports: [SharedModule, TranslateModule.forRoot()],
      providers: [
        provideMockStore(),
        ProductCategoryFacade,
        AuthFacade
      ]
    });

    fixture = TestBed.createComponent(ProductCategoryListViewComponent);
    component = fixture.componentInstance;
    facade = TestBed.get(ProductCategoryFacade);
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should loadProductCategory on init', () => {
    spyOn(facade, 'loadProductCategories');
    fixture.detectChanges();
    expect(facade.loadProductCategories).toHaveBeenCalledWith();
  });

  it('should call showAddProductCategoryModal on add event', () => {
    spyOn(facade, 'showAddProductCategoryModal');
    component.onAdd();
    expect(facade.showAddProductCategoryModal).toHaveBeenCalledWith();
  });

  it('should call showUpdateProductCategoryModal on update event', () => {
    spyOn(facade, 'showUpdateProductCategoryModal');
    component.onUpdate(1);
    expect(facade.showUpdateProductCategoryModal).toHaveBeenCalledWith();
  });

  it('should call selectProductCategory on update event', () => {
    spyOn(facade, 'selectProductCategory');
    component.onUpdate(1);
    expect(facade.selectProductCategory).toHaveBeenCalledWith(1);
  });

  it('should call showDeleteProductCategoryModal on update event', () => {
    spyOn(facade, 'showDeleteProductCategoryModal');
    component.onDelete(1);
    expect(facade.showDeleteProductCategoryModal).toHaveBeenCalledWith();
  });

  it('should call selectProductCategory on delete event', () => {
    spyOn(facade, 'selectProductCategory');
    component.onDelete(1);
    expect(facade.selectProductCategory).toHaveBeenCalledWith(1);
  });
});
