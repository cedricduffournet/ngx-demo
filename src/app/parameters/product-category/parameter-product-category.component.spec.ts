import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ParameterProductCategoryComponent } from '@app/parameters/product-category';

@Component({ selector: 'app-product-category-list-view', template: '' })
class ListProductCategoryViewStubComponent {}

describe('ParameterCivilityComponent', () => {
  let fixture: ComponentFixture<ParameterProductCategoryComponent>;
  let component: ParameterProductCategoryComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParameterProductCategoryComponent, ListProductCategoryViewStubComponent]
    });

    fixture = TestBed.createComponent(ParameterProductCategoryComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
