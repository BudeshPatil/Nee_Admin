import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPodcastComponent } from './view-podcast.component';

describe('ViewPodcastComponent', () => {
  let component: ViewPodcastComponent;
  let fixture: ComponentFixture<ViewPodcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPodcastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPodcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
