import { TestBed, ComponentFixture } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';
import { ValidationActionModule } from '@app/shared/validation-action';

import { ProductDeleteComponent } from '@app/product/components';
import { Product } from '@app/product/models/product';

describe('ProductDelete', () => {
  let fixture: ComponentFixture<ProductDeleteComponent>;
  let component: ProductDeleteComponent;
  const product: Product = {
    id: 1,
    name: 'testname1'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), ValidationActionModule],
      declarations: [ProductDeleteComponent]
    });

    fixture = TestBed.createComponent(ProductDeleteComponent);
    component = fixture.componentInstance;
    component.product = product;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit delete event', () => {
    spyOn(component.delete, 'emit');
    component.onDelete(product);
    expect(component.delete.emit).toHaveBeenCalledWith(product);
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
