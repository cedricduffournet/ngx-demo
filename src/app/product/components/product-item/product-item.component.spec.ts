import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';

import { ActionsItemsModule } from '@app/shared/actions-item';
import { ProductItemComponent } from '@app/product/components';
import { Product } from '@app/product/models/product';

describe('ProductItem', () => {
  let fixture: ComponentFixture<ProductItemComponent>;
  let component: ProductItemComponent;
  const product: Product = {
    id: 1,
    name: 'testname'
  } as Product;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), ActionsItemsModule],
      declarations: [ProductItemComponent]
    });

    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    component.authorization = {
      create: false,
      update: false,
      delete: false
    };
    component.product = product;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit remove event', () => {
    spyOn(component.delete, 'emit');
    component.onDelete(product.id);
    expect(component.delete.emit).toHaveBeenCalledWith(product.id);
  });

  it('should emit edit event', () => {
    spyOn(component.update, 'emit');
    component.onUpdate(product.id);
    expect(component.update.emit).toHaveBeenCalledWith(product.id);
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
