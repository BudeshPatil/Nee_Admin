import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAttributesComponent } from './view-attributes.component';

describe('ViewAttributesComponent', () => {
  let component: ViewAttributesComponent;
  let fixture: ComponentFixture<ViewAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAttributesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
