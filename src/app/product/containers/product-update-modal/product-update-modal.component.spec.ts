import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ModalWrapperModule } from '@app/shared/modal';
import { ProductFacade } from '@app/product/state/product.facade';

import {
  ProductUpdateComponent,
  ProductFormComponent
} from '@app/product/components';
import { ProductUpdateModalComponent } from '@app/product/containers';
import { Product } from '@app/product/models/product';

describe('UpdateProductModalComponent', () => {
  let fixture: ComponentFixture<ProductUpdateModalComponent>;
  let component: ProductUpdateModalComponent;
  let facade: ProductFacade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductUpdateComponent,
        ProductUpdateModalComponent,
        ProductFormComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        FormModule,
        ValidationActionModule,
        ModalWrapperModule,
        ReactiveFormsModule
      ],
      providers: [
        provideMockStore(),
        BsModalRef,
        {
          provide: ProductFacade,
          useValue: {
            selected$: of({
              name: 'TestName'
            }),
            updated$: of(false),
            updateProduct: jest.fn()
          }
        }
      ]
    });

    fixture = TestBed.createComponent(ProductUpdateModalComponent);
    component = fixture.componentInstance;
    facade = TestBed.get(ProductFacade);
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should call updateProduct event on submit', () => {
    spyOn(facade, 'updateProduct');
    const data = {
      id: 1,
      product: {
        name: 'name'
      } as Product
    };
    fixture.detectChanges();
    component.onUpdate(data);
    expect(facade.updateProduct).toHaveBeenCalledWith(data);
  });

  it('should close if product updated', () => {
    spyOn(component.bsModalRef, 'hide');
    facade.updated$ = of(true);
    fixture.detectChanges();
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });

  it('should close modal on cancel', () => {
    spyOn(component.bsModalRef, 'hide');
    fixture.detectChanges();
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
