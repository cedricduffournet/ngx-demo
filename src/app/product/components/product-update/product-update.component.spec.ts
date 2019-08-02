import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import {
  ProductUpdateComponent,
  ProductFormComponent
} from '@app/product/components';
import { Product } from '@app/product/models/product';

describe('ProductUpdate', () => {
  let fixture: ComponentFixture<ProductUpdateComponent>;
  let component: ProductUpdateComponent;
  const product: Product = {
    id: 1,
    name: 'testname1'
  } as Product;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        FormModule,
        ValidationActionModule
      ],
      declarations: [ProductUpdateComponent, ProductFormComponent]
    });

    fixture = TestBed.createComponent(ProductUpdateComponent);
    component = fixture.componentInstance;
    component.product = product;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit save event', () => {
    spyOn(component.update, 'emit');
    component.onSave({ name: 'nameupdated' } as Product);
    expect(component.update.emit).toHaveBeenCalledWith({
      id: product.id,
      product: { name: 'nameupdated' }
    });
  });

  it('should indicate product is updating', () => {
    component.updating = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit cancel event', () => {
    spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(component.cancel.emit).toHaveBeenCalledWith('cancel');
  });
});
