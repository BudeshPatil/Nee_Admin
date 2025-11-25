import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBoudytypeComponent } from './view-boudytype.component';

describe('ViewBoudytypeComponent', () => {
  let component: ViewBoudytypeComponent;
  let fixture: ComponentFixture<ViewBoudytypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBoudytypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBoudytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
