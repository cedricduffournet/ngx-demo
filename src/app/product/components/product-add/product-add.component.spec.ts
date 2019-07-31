import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';

import {
  ProductAddComponent,
  ProductFormComponent
} from '@app/product/components';
import { Product } from '@app/product/models/product';

describe('ProductAdd', () => {
  let component: ProductAddComponent;
  let fixture: ComponentFixture<ProductAddComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        FormModule,
        ValidationActionModule
      ],
      declarations: [ProductFormComponent, ProductAddComponent]
    });

    fixture = TestBed.createComponent(ProductAddComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit a save event when form is submitted', () => {
    const product = {
      name: 'Name'
    } as Product;
    spyOn(component.add, 'emit');
    component.onSave(product);

    expect(component.add.emit).toHaveBeenCalledWith(product);
  });

  it('should emit a cancel event when form canceled', () => {
    spyOn(component.cancel, 'emit');
    component.onCancel();

    expect(component.cancel.emit).toHaveBeenCalledWith('cancel');
  });

  it('should indicate to form product is processing', () => {
    component.adding = true;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should indicate to form product is not processing', () => {
    component.adding = false;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
