import { TestBed, ComponentFixture } from '@angular/core/testing';

import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';

import { ModalWrapperModule } from '@app/shared/modal';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ProductCategoryDeleteComponent } from '@app/product-category/components';
import { ProductCategoryDeleteModalComponent } from '@app/product-category/containers';
import { ProductCategory } from '@app/product-category/models/product-category';
import { ProductCategoryFacade } from '@app/product-category/state/product-category.facade';

describe('DeleteProductCategoryModalComponent', () => {
  let fixture: ComponentFixture<ProductCategoryDeleteModalComponent>;
  let component: ProductCategoryDeleteModalComponent;
  let facade: ProductCategoryFacade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCategoryDeleteComponent, ProductCategoryDeleteModalComponent],
      imports: [
        TranslateModule.forRoot(),
        ModalWrapperModule,
        ValidationActionModule
      ],
      providers: [
        provideMockStore(),
        BsModalRef,
        {
          provide: ProductCategoryFacade,
          useValue: {
            deleted$: of(false),
            deleteProductCategory: jest.fn()
          }
        }
      ]
    });

    facade = TestBed.get(ProductCategoryFacade);
    fixture = TestBed.createComponent(ProductCategoryDeleteModalComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should call deleteProductCategory event on submit', () => {
    const productCategory = {
      id: 1,
      name: 'name'
    } as ProductCategory;
    fixture.detectChanges();
    component.onDelete(productCategory);

    expect(facade.deleteProductCategory).toHaveBeenCalledWith(productCategory);
  });

  it('should close if productCategory deleted', () => {
    spyOn(component.bsModalRef, 'hide');
    facade.deleted$ = of(true);
    fixture.detectChanges();
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });

  it('should close modal on cancel', () => {
    fixture.detectChanges();
    spyOn(component.bsModalRef, 'hide');
    component.onCancel();
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });

  it('should unsubscribe subscription when destroyed', () => {
    fixture.detectChanges();
    spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});
