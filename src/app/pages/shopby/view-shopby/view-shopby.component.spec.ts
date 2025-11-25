import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShopbyComponent } from './view-shopby.component';

describe('ViewShopbyComponent', () => {
  let component: ViewShopbyComponent;
  let fixture: ComponentFixture<ViewShopbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewShopbyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewShopbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
