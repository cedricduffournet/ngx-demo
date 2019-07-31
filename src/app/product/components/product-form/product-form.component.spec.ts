import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ProductFormComponent } from '@app/product/components';
import { Product } from '@app/product/models/product';

describe('ProductForm', () => {
  let fixture: ComponentFixture<ProductFormComponent>;
  let component: ProductFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        FormModule,
        ValidationActionModule
      ],
      declarations: [ProductFormComponent]
    });

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should not emit event if name not filled', () => {
    const product = {
      name: ''
    } as Product;

    fixture.detectChanges();
    component.productForm.setValue(product);

    spyOn(component.save, 'emit');
    component.onSubmit();

    expect(component.save.emit).not.toHaveBeenCalled();
  });


  it('should disable the form if processing', () => {
    component.processing = true;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should emit save event with new product, if the form is valid, when submitted', () => {
    const product = {name: 'test' };
    fixture.detectChanges();

    component.productForm.setValue(product);

    spyOn(component.save, 'emit');
    component.onSubmit();

    expect(component.save.emit).toHaveBeenCalledWith(product);
  });

  it('should emit cancel event when click cancel button', () => {
    fixture.detectChanges();

    spyOn(component.cancel, 'emit');

    component.onCancel();

    expect(component.cancel.emit).toHaveBeenCalledWith('cancel');
  });

  it('should fill form with product value', () => {
    const product = {
      name: 'testName'
    } as Product;
    component.product = product;
    fixture.detectChanges();

    expect(component.productForm.value).toEqual(product);
  });
});
