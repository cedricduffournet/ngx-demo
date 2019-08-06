import { TestBed, ComponentFixture } from '@angular/core/testing';

import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';

import { ModalWrapperModule } from '@app/shared/modal';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ProductDeleteComponent } from '@app/product/components';
import { ProductDeleteModalComponent } from '@app/product/containers';
import { Product } from '@app/product/models/product';
import { ProductFacade } from '@app/product/state/product.facade';

describe('DeleteProductModalComponent', () => {
  let fixture: ComponentFixture<ProductDeleteModalComponent>;
  let component: ProductDeleteModalComponent;
  let facade: ProductFacade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDeleteComponent, ProductDeleteModalComponent],
      imports: [
        TranslateModule.forRoot(),
        ModalWrapperModule,
        ValidationActionModule
      ],
      providers: [
        provideMockStore(),
        BsModalRef,
        {
          provide: ProductFacade,
          useValue: {
            deleted$: of(false),
            deleteProduct: jest.fn()
          }
        }
      ]
    });

    facade = TestBed.get(ProductFacade);
    fixture = TestBed.createComponent(ProductDeleteModalComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should call deleteProduct event on submit', () => {
    const product = {
      id: 1,
      name: 'name'
    } as Product;
    fixture.detectChanges();
    component.onDelete(product);

    expect(facade.deleteProduct).toHaveBeenCalledWith(product);
  });

  it('should close if product deleted', () => {
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
