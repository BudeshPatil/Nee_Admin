import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLastSearchComponent } from './view-last-search.component';

describe('ViewLastSearchComponent', () => {
  let component: ViewLastSearchComponent;
  let fixture: ComponentFixture<ViewLastSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLastSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLastSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
