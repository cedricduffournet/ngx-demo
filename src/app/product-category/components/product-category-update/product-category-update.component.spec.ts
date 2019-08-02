import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import {
  ProductCategoryUpdateComponent,
  ProductCategoryFormComponent
} from '@app/product-category/components';
import { ProductCategory } from '@app/product-category/models/product-category';

describe('ProductCategoryUpdate', () => {
  let fixture: ComponentFixture<ProductCategoryUpdateComponent>;
  let component: ProductCategoryUpdateComponent;
  const productCategory: ProductCategory = {
    id: 1,
    name: 'testname1'
  } as ProductCategory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        FormModule,
        ValidationActionModule
      ],
      declarations: [ProductCategoryUpdateComponent, ProductCategoryFormComponent]
    });

    fixture = TestBed.createComponent(ProductCategoryUpdateComponent);
    component = fixture.componentInstance;
    component.productCategory = productCategory;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit save event', () => {
    spyOn(component.update, 'emit');
    component.onSave({ name: 'nameupdated' } as ProductCategory);
    expect(component.update.emit).toHaveBeenCalledWith({
      id: productCategory.id,
      productCategory: { name: 'nameupdated' }
    });
  });

  it('should indicate productCategory is updating', () => {
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
