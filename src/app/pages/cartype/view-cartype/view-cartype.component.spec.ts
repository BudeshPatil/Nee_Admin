import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCartypeComponent } from './view-cartype.component';

describe('ViewCartypeComponent', () => {
  let component: ViewCartypeComponent;
  let fixture: ComponentFixture<ViewCartypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCartypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCartypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
