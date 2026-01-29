import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTvshowComponent } from './view-tvshow.component';

describe('ViewTvshowComponent', () => {
  let component: ViewTvshowComponent;
  let fixture: ComponentFixture<ViewTvshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTvshowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTvshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
