import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAboutViewComponent } from './home-about-view.component';

describe('HomeAboutViewComponent', () => {
  let component: HomeAboutViewComponent;
  let fixture: ComponentFixture<HomeAboutViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAboutViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAboutViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
