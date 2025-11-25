import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewYatchsComponent } from './view-yatchs.component';

describe('ViewYatchsComponent', () => {
  let component: ViewYatchsComponent;
  let fixture: ComponentFixture<ViewYatchsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewYatchsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewYatchsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
