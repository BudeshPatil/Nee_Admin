import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPromocodeComponent } from './view-promocode.component';

describe('ViewPromocodeComponent', () => {
  let component: ViewPromocodeComponent;
  let fixture: ComponentFixture<ViewPromocodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPromocodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPromocodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
