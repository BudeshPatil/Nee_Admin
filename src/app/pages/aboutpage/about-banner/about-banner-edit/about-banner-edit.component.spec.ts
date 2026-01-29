import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBannerEditComponent } from './about-banner-edit.component';

describe('AboutBannerEditComponent', () => {
  let component: AboutBannerEditComponent;
  let fixture: ComponentFixture<AboutBannerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutBannerEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutBannerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
