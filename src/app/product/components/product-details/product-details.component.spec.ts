import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TranslateModule } from '@ngx-translate/core';

import { ActionsItemsModule } from '@app/shared/actions-item';
import { PipesModule } from '@app/shared/pipes/pipe.module';
import { ProductDetailsComponent } from '@app/product/components';
import { ProductFull } from '@app/product/models/product';

describe('ProductDetails', () => {
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let component: ProductDetailsComponent;
  const product: ProductFull = {
    id: 1,
    name: 'testname',
    description: 'Description',
    priceAmount: 1000,
    categories: [
      {
        id: 1,
        name: 'Category 1'
      },
      {
        id: 2,
        name: 'Category 2'
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), ActionsItemsModule, PipesModule],
      declarations: [ProductDetailsComponent]
    });

    fixture = TestBed.createComponent(ProductDetailsComponent);
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

  it('should have description', () => {
    fixture.detectChanges();
    const elem = fixture.nativeElement.querySelector('p');
    expect(elem.textContent).toEqual('Description');
  });

  it('should have product name', () => {
    fixture.detectChanges();
    const elem = fixture.nativeElement.querySelector('h1');
    expect(elem.textContent).toEqual('testname');
  });

  it('should have 2 category', () => {
    fixture.detectChanges();
    const elem = fixture.nativeElement.querySelectorAll('.category');
    expect(elem.length).toBe(2);
  });

  it('should not have edit button', () => {
    fixture.detectChanges();
    const elem = fixture.nativeElement.querySelector('button.btn-edit');
    expect(elem).toBeFalsy();
  });

  it('should have edit button', () => {
    component.authorization = {
      create: false,
      update: true,
      delete: false
    };
    fixture.detectChanges();
    const elem = fixture.nativeElement.querySelector('button.btn-edit');
    expect(elem).toBeTruthy();
  });

  it('should emit update event', () => {
    spyOn(component.update, 'emit');

    component.authorization = {
      create: false,
      update: true,
      delete: false
    };
    fixture.detectChanges();
    const elem = fixture.debugElement.query(By.css('app-actions-item'));
    elem.triggerEventHandler('edit', {});

    expect(component.update.emit).toHaveBeenCalled();
  });

  it('should not have delete button', () => {
    fixture.detectChanges();
    const elem = fixture.nativeElement.querySelector('button.btn-delete');
    expect(elem).toBeFalsy();
  });

  it('should have delete button', () => {
    component.authorization = {
      create: false,
      update: false,
      delete: true
    };
    fixture.detectChanges();
    const elem = fixture.nativeElement.querySelector('button.btn-delete');
    expect(elem).toBeTruthy();
  });

  it('should emit delete event', () => {
    spyOn(component.delete, 'emit');

    component.authorization = {
      create: false,
      update: false,
      delete: true
    };
    fixture.detectChanges();
    const elem = fixture.debugElement.query(By.css('app-actions-item'));
    elem.triggerEventHandler('delete', {});

    expect(component.delete.emit).toHaveBeenCalled();
  });
});
