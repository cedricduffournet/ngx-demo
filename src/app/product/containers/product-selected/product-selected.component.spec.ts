import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ModalWrapperModule } from '@app/shared/modal';

import { ProductSelectedComponent } from '@app/product/containers';
import { ProductDetailsComponent } from '@app/product/components';
import { ProductFacade } from '@app/product/state/product.facade';
import { AuthFacade } from '@app/authentication/state/auth.facade';
import { PipesModule } from '@app/shared/pipes/pipe.module';
import { ActionsItemsModule } from '@app/shared/actions-item';

describe('ProductSelectedComponent', () => {
  let fixture: ComponentFixture<ProductSelectedComponent>;
  let component: ProductSelectedComponent;
  let facade: ProductFacade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductDetailsComponent,
        ProductSelectedComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        FormModule,
        ValidationActionModule,
        ReactiveFormsModule,
        ModalWrapperModule,
        PipesModule,
        ActionsItemsModule
      ],
      providers: [
        provideMockStore(),
        AuthFacade,
        {
          provide: ProductFacade,
          useValue: {
            selectedDenormalized$: of({
              name: 'Name',
              categories: [
                {
                  id: 1,
                  name: 'Name'
                }
              ]
            }),
            showUpdateProductModal: jest.fn(),
            showDeleteProductModal: jest.fn()
          }
        }
      ]
    });
    facade = TestBed.get(ProductFacade);
    fixture = TestBed.createComponent(ProductSelectedComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should call showUpdateProductModal on update', () => {
    spyOn(facade, 'showUpdateProductModal');
    component.onUpdate();
    expect(facade.showUpdateProductModal).toHaveBeenCalledWith();
  });

  it('should call showDeleteProductModal on delete', () => {
    spyOn(facade, 'showDeleteProductModal');
    component.onDelete();
    expect(facade.showDeleteProductModal).toHaveBeenCalledWith();
  });
});
