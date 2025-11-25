import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShippingComponent } from './view-shipping.component';

describe('ViewShippingComponent', () => {
  let component: ViewShippingComponent;
  let fixture: ComponentFixture<ViewShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewShippingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
