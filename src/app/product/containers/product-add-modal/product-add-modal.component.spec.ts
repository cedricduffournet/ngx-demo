import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ModalWrapperModule } from '@app/shared/modal';

import { ProductAddModalComponent } from '@app/product/containers';
import {
  ProductAddComponent,
  ProductFormComponent
} from '@app/product/components';
import { Product } from '@app/product/models/product';
import { ProductFacade } from '@app/product/state/product.facade';

describe('ProductAddModalComponent', () => {
  let fixture: ComponentFixture<ProductAddModalComponent>;
  let component: ProductAddModalComponent;
  let facade: ProductFacade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductAddComponent,
        ProductAddModalComponent,
        ProductFormComponent
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
          provide: ProductFacade,
          useValue: {
            added$: of(false),
            addProduct: jest.fn()
          }
        }
      ]
    });
    facade = TestBed.get(ProductFacade);
    fixture = TestBed.createComponent(ProductAddModalComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should call addProduct event on submit', () => {
    spyOn(facade, 'addProduct');
    const product = {
      name: 'name'
    } as Product;
    fixture.detectChanges();
    component.onAdd(product);

    expect(facade.addProduct).toHaveBeenCalledWith(product);
  });

  it('should close if product added', () => {
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
