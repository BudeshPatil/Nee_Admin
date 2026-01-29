import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAwardComponent } from './view-award.component';

describe('ViewAwardComponent', () => {
  let component: ViewAwardComponent;
  let fixture: ComponentFixture<ViewAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAwardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
