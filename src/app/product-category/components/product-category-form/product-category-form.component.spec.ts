import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ProductCategoryFormComponent } from '@app/product-category/components';
import { ProductCategory } from '@app/product-category/models/product-category';

describe('ProductCategoryForm', () => {
  let fixture: ComponentFixture<ProductCategoryFormComponent>;
  let component: ProductCategoryFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        FormModule,
        ValidationActionModule
      ],
      declarations: [ProductCategoryFormComponent]
    });

    fixture = TestBed.createComponent(ProductCategoryFormComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should not emit event if name not filled', () => {
    const productCategory = {
      name: ''
    } as ProductCategory;

    fixture.detectChanges();
    component.productCategoryForm.setValue(productCategory);

    spyOn(component.save, 'emit');
    component.onSubmit();

    expect(component.save.emit).not.toHaveBeenCalled();
  });


  it('should disable the form if processing', () => {
    component.processing = true;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should emit save event with new productCategory, if the form is valid, when submitted', () => {
    const productCategory = {name: 'test' };
    fixture.detectChanges();

    component.productCategoryForm.setValue(productCategory);

    spyOn(component.save, 'emit');
    component.onSubmit();

    expect(component.save.emit).toHaveBeenCalledWith(productCategory);
  });

  it('should emit cancel event when click cancel button', () => {
    fixture.detectChanges();

    spyOn(component.cancel, 'emit');

    component.onCancel();

    expect(component.cancel.emit).toHaveBeenCalledWith('cancel');
  });

  it('should fill form with productCategory value', () => {
    const productCategory = {
      name: 'testName'
    } as ProductCategory;
    component.productCategory = productCategory;
    fixture.detectChanges();

    expect(component.productCategoryForm.value).toEqual(productCategory);
  });
});
