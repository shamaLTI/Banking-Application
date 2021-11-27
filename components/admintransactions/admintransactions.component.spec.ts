import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintransactionsComponent } from './admintransactions.component';

describe('AdmintransactionsComponent', () => {
  let component: AdmintransactionsComponent;
  let fixture: ComponentFixture<AdmintransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmintransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmintransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
