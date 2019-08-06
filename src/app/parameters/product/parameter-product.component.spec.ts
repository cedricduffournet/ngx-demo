import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ParameterProductComponent } from '@app/parameters/product';

@Component({ selector: 'app-product-list-view', template: '' })
class ListProductViewStubComponent {}

describe('ParameterProductComponent', () => {
  let fixture: ComponentFixture<ParameterProductComponent>;
  let component: ParameterProductComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParameterProductComponent, ListProductViewStubComponent]
    });

    fixture = TestBed.createComponent(ParameterProductComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
