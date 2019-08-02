import { TestBed, ComponentFixture } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import {
  ProductItemComponent,
  ProductItemsComponent
} from '@app/product/components';
import { ProductListViewComponent } from '@app/product/containers';
import { SharedModule } from '@app/shared/shared.module';
import { ProductFacade } from '@app/product/state/product.facade';
import { AuthFacade } from '@app/authentication/state/auth.facade';

describe('ProductListViewComponent', () => {
  let fixture: ComponentFixture<ProductListViewComponent>;
  let component: ProductListViewComponent;
  let facade: ProductFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductListViewComponent,
        ProductItemsComponent,
        ProductItemComponent
      ],
      imports: [SharedModule, TranslateModule.forRoot()],
      providers: [
        provideMockStore(),
        ProductFacade,
        AuthFacade
      ]
    });

    fixture = TestBed.createComponent(ProductListViewComponent);
    component = fixture.componentInstance;
    facade = TestBed.get(ProductFacade);
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should loadProduct on init', () => {
    spyOn(facade, 'loadProducts');
    fixture.detectChanges();
    expect(facade.loadProducts).toHaveBeenCalledWith();
  });

  it('should call showAddProductModal on add event', () => {
    spyOn(facade, 'showAddProductModal');
    component.onAdd();
    expect(facade.showAddProductModal).toHaveBeenCalledWith();
  });

  it('should call showUpdateProductModal on update event', () => {
    spyOn(facade, 'showUpdateProductModal');
    component.onUpdate(1);
    expect(facade.showUpdateProductModal).toHaveBeenCalledWith();
  });

  it('should call selectProduct on update event', () => {
    spyOn(facade, 'selectProduct');
    component.onUpdate(1);
    expect(facade.selectProduct).toHaveBeenCalledWith(1);
  });

  it('should call showDeleteProductModal on update event', () => {
    spyOn(facade, 'showDeleteProductModal');
    component.onDelete(1);
    expect(facade.showDeleteProductModal).toHaveBeenCalledWith();
  });

  it('should call selectProduct on delete event', () => {
    spyOn(facade, 'selectProduct');
    component.onDelete(1);
    expect(facade.selectProduct).toHaveBeenCalledWith(1);
  });

  it('should call changePage when page change', () => {
    spyOn(facade, 'changePage');
    component.onPageChanged(1);
    expect(facade.changePage).toHaveBeenCalledWith(1);
  });
});
