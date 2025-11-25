import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductdComponent } from './view-productd.component';

describe('ViewProductdComponent', () => {
  let component: ViewProductdComponent;
  let fixture: ComponentFixture<ViewProductdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProductdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
