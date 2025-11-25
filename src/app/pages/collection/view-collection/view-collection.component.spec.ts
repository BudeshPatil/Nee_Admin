import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCollectionComponent } from './view-collection.component';

describe('ViewCollectionComponent', () => {
  let component: ViewCollectionComponent;
  let fixture: ComponentFixture<ViewCollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCollectionComponent]
    });
    fixture = TestBed.createComponent(ViewCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
