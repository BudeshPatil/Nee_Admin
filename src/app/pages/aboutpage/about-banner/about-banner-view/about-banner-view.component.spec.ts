import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBannerViewComponent } from './about-banner-view.component';

describe('AboutBannerViewComponent', () => {
  let component: AboutBannerViewComponent;
  let fixture: ComponentFixture<AboutBannerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutBannerViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutBannerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
