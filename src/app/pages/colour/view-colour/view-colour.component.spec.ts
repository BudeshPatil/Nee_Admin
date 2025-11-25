import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewColourComponent } from './view-colour.component';

describe('ViewColourComponent', () => {
  let component: ViewColourComponent;
  let fixture: ComponentFixture<ViewColourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewColourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewColourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
