import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';

import { ActionsItemsModule } from '@app/shared/actions-item';
import { ProductCategoryItemComponent } from '@app/product-category/components';
import { ProductCategory } from '@app/product-category/models/product-category';

describe('ProductCategoryItem', () => {
  let fixture: ComponentFixture<ProductCategoryItemComponent>;
  let component: ProductCategoryItemComponent;
  const productCategory: ProductCategory = {
    id: 1,
    name: 'testname'
  } as ProductCategory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), ActionsItemsModule],
      declarations: [ProductCategoryItemComponent]
    });

    fixture = TestBed.createComponent(ProductCategoryItemComponent);
    component = fixture.componentInstance;
    component.authorization = {
      create: false,
      update: false,
      delete: false
    };
    component.productCategory = productCategory;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit remove event', () => {
    spyOn(component.delete, 'emit');
    component.onDelete(productCategory.id);
    expect(component.delete.emit).toHaveBeenCalledWith(productCategory.id);
  });

  it('should emit edit event', () => {
    spyOn(component.update, 'emit');
    component.onUpdate(productCategory.id);
    expect(component.update.emit).toHaveBeenCalledWith(productCategory.id);
  });

  it('should display edit button', () => {
    component.authorization = {
      update: true,
      delete: true,
      create: true
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display remove button', () => {
    component.authorization = {
      update: true,
      delete: true,
      create: true
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
