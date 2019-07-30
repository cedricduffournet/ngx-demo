import { TestBed, ComponentFixture } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';
import { ValidationActionModule } from '@app/shared/validation-action';

import { ProductCategoryDeleteComponent } from '@app/product-category/components';
import { ProductCategory } from '@app/product-category/models/product-category';

describe('ProductCategoryDelete', () => {
  let fixture: ComponentFixture<ProductCategoryDeleteComponent>;
  let component: ProductCategoryDeleteComponent;
  const productCategory: ProductCategory = {
    id: 1,
    name: 'testname1'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), ValidationActionModule],
      declarations: [ProductCategoryDeleteComponent]
    });

    fixture = TestBed.createComponent(ProductCategoryDeleteComponent);
    component = fixture.componentInstance;
    component.productCategory = productCategory;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit delete event', () => {
    spyOn(component.delete, 'emit');
    component.onDelete(productCategory);
    expect(component.delete.emit).toHaveBeenCalledWith(productCategory);
  });

  it('should emit cancel event', () => {
    spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('should pass deleting to component', () => {
    component.deleting = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
