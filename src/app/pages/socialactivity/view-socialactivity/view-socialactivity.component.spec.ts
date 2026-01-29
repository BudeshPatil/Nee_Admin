import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSocialactivityComponent } from './view-socialactivity.component';

describe('ViewSocialactivityComponent', () => {
  let component: ViewSocialactivityComponent;
  let fixture: ComponentFixture<ViewSocialactivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSocialactivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSocialactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
