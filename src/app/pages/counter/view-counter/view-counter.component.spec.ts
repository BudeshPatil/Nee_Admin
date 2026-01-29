import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCounterComponent } from './view-counter.component';

describe('ViewCounterComponent', () => {
  let component: ViewCounterComponent;
  let fixture: ComponentFixture<ViewCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCounterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
