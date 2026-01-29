import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAboutEditComponent } from './home-about-edit.component';

describe('HomeAboutEditComponent', () => {
  let component: HomeAboutEditComponent;
  let fixture: ComponentFixture<HomeAboutEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAboutEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAboutEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
