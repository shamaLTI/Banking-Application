import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallcustomerssComponent } from './getallcustomerss.component';

describe('GetallcustomerssComponent', () => {
  let component: GetallcustomerssComponent;
  let fixture: ComponentFixture<GetallcustomerssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetallcustomerssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetallcustomerssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
