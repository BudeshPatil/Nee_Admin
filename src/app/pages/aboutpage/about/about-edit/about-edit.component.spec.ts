import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutEditComponent } from './about-edit.component';

describe('AboutEditComponent', () => {
  let component: AboutEditComponent;
  let fixture: ComponentFixture<AboutEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
