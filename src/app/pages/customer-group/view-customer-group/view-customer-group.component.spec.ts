import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomerGroupComponent } from './view-customer-group.component';

describe('ViewCustomerGroupComponent', () => {
  let component: ViewCustomerGroupComponent;
  let fixture: ComponentFixture<ViewCustomerGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCustomerGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCustomerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
