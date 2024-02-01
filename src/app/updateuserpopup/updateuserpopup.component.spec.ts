import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateuserpopupComponent } from './updateuserpopup.component';

describe('UpdateuserpopupComponent', () => {
  let component: UpdateuserpopupComponent;
  let fixture: ComponentFixture<UpdateuserpopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateuserpopupComponent]
    });
    fixture = TestBed.createComponent(UpdateuserpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
