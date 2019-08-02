import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ModalWrapperModule } from '@app/shared/modal';

import { ProductCategoryAddModalComponent } from '@app/product-category/containers';
import {
  ProductCategoryAddComponent,
  ProductCategoryFormComponent
} from '@app/product-category/components';
import { ProductCategory } from '@app/product-category/models/product-category';
import { ProductCategoryFacade } from '@app/product-category/state/product-category.facade';

describe('ProductCategoryAddModalComponent', () => {
  let fixture: ComponentFixture<ProductCategoryAddModalComponent>;
  let component: ProductCategoryAddModalComponent;
  let facade: ProductCategoryFacade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductCategoryAddComponent,
        ProductCategoryAddModalComponent,
        ProductCategoryFormComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        FormModule,
        ValidationActionModule,
        ReactiveFormsModule,
        ModalWrapperModule
      ],
      providers: [
        provideMockStore(),
        BsModalRef,
        {
          provide: ProductCategoryFacade,
          useValue: {
            added$: of(false),
            addProductCategory: jest.fn()
          }
        }
      ]
    });
    facade = TestBed.get(ProductCategoryFacade);
    fixture = TestBed.createComponent(ProductCategoryAddModalComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should call addProductCategory event on submit', () => {
    spyOn(facade, 'addProductCategory');
    const productCategory = {
      name: 'name'
    } as ProductCategory;
    fixture.detectChanges();
    component.onAdd(productCategory);

    expect(facade.addProductCategory).toHaveBeenCalledWith(productCategory);
  });

  it('should close if productCategory added', () => {
    spyOn(component.bsModalRef, 'hide');
    facade.added$ = of(true);
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
