import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTopSearchComponent } from './view-top-search.component';

describe('ViewTopSearchComponent', () => {
  let component: ViewTopSearchComponent;
  let fixture: ComponentFixture<ViewTopSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTopSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTopSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
