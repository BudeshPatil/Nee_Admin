import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCareerComponent } from './view-career.component';

describe('ViewCareerComponent', () => {
  let component: ViewCareerComponent;
  let fixture: ComponentFixture<ViewCareerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCareerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
