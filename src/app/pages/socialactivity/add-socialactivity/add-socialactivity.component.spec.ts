import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSocialactivityComponent } from './add-socialactivity.component';

describe('AddSocialactivityComponent', () => {
  let component: AddSocialactivityComponent;
  let fixture: ComponentFixture<AddSocialactivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSocialactivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSocialactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
