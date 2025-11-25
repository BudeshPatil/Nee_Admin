import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubcategoryComponent } from './view-subcategory.component';

describe('ViewSubcategoryComponent', () => {
  let component: ViewSubcategoryComponent;
  let fixture: ComponentFixture<ViewSubcategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSubcategoryComponent]
    });
    fixture = TestBed.createComponent(ViewSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
