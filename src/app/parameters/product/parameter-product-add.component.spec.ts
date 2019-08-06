import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ParameterProductAddComponent } from '@app/parameters/product';

@Component({ selector: 'app-product-add-view', template: '' })
class ListProductAddViewComponent {}

describe('ParameterProductAddComponent', () => {
  let fixture: ComponentFixture<ParameterProductAddComponent>;
  let component: ParameterProductAddComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParameterProductAddComponent, ListProductAddViewComponent]
    });

    fixture = TestBed.createComponent(ParameterProductAddComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
