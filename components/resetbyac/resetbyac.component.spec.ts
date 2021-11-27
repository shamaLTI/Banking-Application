import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetbyacComponent } from './resetbyac.component';

describe('ResetbyacComponent', () => {
  let component: ResetbyacComponent;
  let fixture: ComponentFixture<ResetbyacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetbyacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetbyacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
