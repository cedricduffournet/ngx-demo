import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ParameterProductDetailsComponent } from '@app/parameters/product';

@Component({ selector: 'app-product-details-view', template: '' })
class ProductDetailsViewStubComponent {}

describe('ParameterProductDetailsComponent', () => {
  let fixture: ComponentFixture<ParameterProductDetailsComponent>;
  let component: ParameterProductDetailsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParameterProductDetailsComponent, ProductDetailsViewStubComponent]
    });

    fixture = TestBed.createComponent(ParameterProductDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
