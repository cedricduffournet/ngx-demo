import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ProductFormComponent } from '@app/product/components';
import { Product } from '@app/product/models/product';

describe('ProductForm', () => {
  let fixture: ComponentFixture<ProductFormComponent>;
  let component: ProductFormComponent;

  const categories = [
    {
      id: 1,
      name: 'name 1'
    },
    {
      id: 2,
      name: 'name 2'
    }
  ];
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
    component.categories = categories;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should not emit event if name not filled', () => {
    const product = {
      name: '',
      price: {
        amount: 1000
      },
      description: 'description',
      categories: [true, true]
    };

    fixture.detectChanges();
    component.productForm.setValue(product);

    spyOn(component.save, 'emit');
    component.onSubmit();

    expect(component.save.emit).not.toHaveBeenCalled();
  });

  it('should not emit event if description not filled', () => {
    const product = {
      name: 'name',
      price: {
        amount: 1000
      },
      description: '',
      categories: [true, true]
    };

    fixture.detectChanges();
    component.productForm.setValue(product);

    spyOn(component.save, 'emit');
    component.onSubmit();

    expect(component.save.emit).not.toHaveBeenCalled();
  });

  it('should not emit event if amount not filled', () => {
    const product = {
      name: 'name',
      price: {
        amount: ''
      },
      description: 'description',
      categories: [true, true]
    };

    fixture.detectChanges();
    component.productForm.setValue(product);

    spyOn(component.save, 'emit');
    component.onSubmit();

    expect(component.save.emit).not.toHaveBeenCalled();
  });

  it('should disable the form if processing', () => {
    component.processing = true;

    fixture.detectChanges();

    const elem = fixture.nativeElement.querySelector('button.btn-confirm');
    expect(elem.disabled).toBeTruthy();
  });

  it('should emit save event with new product, if the form is valid, when submitted', () => {
    const product = {
      name: 'name',
      price: {
        amount: 1000
      },
      description: 'description',
      categories: [true, false]
    };
    fixture.detectChanges();

    component.productForm.setValue(product);

    spyOn(component.save, 'emit');
    component.onSubmit();

    expect(component.save.emit).toHaveBeenCalledWith({
      ...product,
      categories: [1]
    });
  });

  it('should emit cancel event when click cancel button', () => {
    spyOn(component.cancel, 'emit');
    fixture.detectChanges();
    const elem = fixture.debugElement.query(By.css('app-validation-button'));
    elem.triggerEventHandler('cancel', {});
    expect(component.cancel.emit).toHaveBeenCalledWith('cancel');
  });

  it('should fill form with product value', () => {
    const product = {
      name: 'name',
      priceAmount: 1000,
      description: 'description',
      categories: [1, 2]
    } as Product;
    component.product = product;
    component.categories = categories;
    fixture.detectChanges();

    expect(component.productForm.value).toEqual({
      name: 'name',
      price: {
        amount: 10.0
      },
      description: 'description',
      categories: [true, true]
    });
  });
});
