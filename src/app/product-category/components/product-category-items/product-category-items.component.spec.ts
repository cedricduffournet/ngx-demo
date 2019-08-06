import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';

import { ActionsItemsModule } from '@app/shared/actions-item';
import { ButtonModule } from '@app/shared/button';
import {
  ProductCategoryItemsComponent,
  ProductCategoryItemComponent
} from '@app/product-category/components';
import { ProductCategory } from '@app/product-category/models/product-category';

describe('ProductCategoryItems', () => {
  let fixture: ComponentFixture<ProductCategoryItemsComponent>;
  let component: ProductCategoryItemsComponent;
  const productCategories: ProductCategory[] = [
    {
      id: 1,
      name: 'testname1'
    } as ProductCategory,
    {
      id: 2,
      name: 'testname2'
    } as ProductCategory
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), ActionsItemsModule, ButtonModule],
      declarations: [ProductCategoryItemsComponent, ProductCategoryItemComponent]
    });
    fixture = TestBed.createComponent(ProductCategoryItemsComponent);
    component = fixture.componentInstance;
    component.productCategories = productCategories;
    component.authorization = {
      create: false,
      update: false,
      delete: false
    };
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit delete event', () => {
    spyOn(component.delete, 'emit');
    component.onDelete(productCategories[0].id);
    expect(component.delete.emit).toHaveBeenCalledWith(1);
  });

  it('should emit edit event', () => {
    spyOn(component.update, 'emit');
    component.onUpdate(productCategories[1].id);
    expect(component.update.emit).toHaveBeenCalledWith(2);
  });

  it('should emit add event', () => {
    spyOn(component.add, 'emit');
    component.onAdd();
    expect(component.add.emit).toHaveBeenCalledWith('add');
  });

  it('should display add button', () => {
    component.authorization = {
      update: true,
      delete: true,
      create: true
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should not display add button', () => {
    component.authorization = {
      update: true,
      delete: true,
      create: false
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
