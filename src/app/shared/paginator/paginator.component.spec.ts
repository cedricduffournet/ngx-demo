import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TranslateModule } from '@ngx-translate/core';

import { PaginatorComponent } from '@app/shared/paginator/paginator.component';

describe('PaginatorComponent', () => {
  let fixture: ComponentFixture<PaginatorComponent>;
  let component: PaginatorComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        PaginationModule.forRoot(),
        FormsModule
      ],
      declarations: [PaginatorComponent]
    });

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should emit a pageChanged when page change', () => {
    spyOn(component.pageChanged, 'emit');
    fixture.detectChanges();
    const pagination = fixture.debugElement.query(By.css('pagination'));
    pagination.triggerEventHandler('pageChanged', { page: 1 });
    expect(component.pageChanged.emit).toHaveBeenCalledWith(1);
  });

  it('should have 5 page', () => {
    component.itemsPerPage = 10;
    component.totalItems = 50;
    fixture.detectChanges();
    const paginationList = fixture.nativeElement.querySelectorAll(
      '.pagination-page'
    );
    expect(paginationList.length).toBe(5);
  });
});
