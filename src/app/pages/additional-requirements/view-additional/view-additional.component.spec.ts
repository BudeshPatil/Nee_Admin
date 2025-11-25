import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdditionalComponent } from './view-additional.component';

describe('ViewAdditionalComponent', () => {
  let component: ViewAdditionalComponent;
  let fixture: ComponentFixture<ViewAdditionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAdditionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
