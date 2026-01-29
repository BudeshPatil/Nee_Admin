import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBannerViewComponent } from './home-banner-view.component';

describe('HomeBannerViewComponent', () => {
  let component: HomeBannerViewComponent;
  let fixture: ComponentFixture<HomeBannerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBannerViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBannerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
