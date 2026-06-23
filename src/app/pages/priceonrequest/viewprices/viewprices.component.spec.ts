import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpricesComponent } from './viewprices.component';

describe('ViewpricesComponent', () => {
  let component: ViewpricesComponent;
  let fixture: ComponentFixture<ViewpricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewpricesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewpricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
