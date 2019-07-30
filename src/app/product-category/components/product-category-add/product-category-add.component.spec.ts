import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';

import {
  ProductCategoryAddComponent,
  ProductCategoryFormComponent
} from '@app/product-category/components';
import { ProductCategory } from '@app/product-category/models/product-category';

describe('ProductCategoryAdd', () => {
  let component: ProductCategoryAddComponent;
  let fixture: ComponentFixture<ProductCategoryAddComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        FormModule,
        ValidationActionModule
      ],
      declarations: [ProductCategoryFormComponent, ProductCategoryAddComponent]
    });

    fixture = TestBed.createComponent(ProductCategoryAddComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit a save event when form is submitted', () => {
    const productCategory = {
      name: 'Name'
    } as ProductCategory;
    spyOn(component.add, 'emit');
    component.onSave(productCategory);

    expect(component.add.emit).toHaveBeenCalledWith(productCategory);
  });

  it('should emit a cancel event when form canceled', () => {
    spyOn(component.cancel, 'emit');
    component.onCancel();

    expect(component.cancel.emit).toHaveBeenCalledWith('cancel');
  });

  it('should indicate to form productCategory is processing', () => {
    component.adding = true;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should indicate to form productCategory is not processing', () => {
    component.adding = false;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
