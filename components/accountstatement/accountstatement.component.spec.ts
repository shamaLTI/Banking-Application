import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountstatementComponent } from './accountstatement.component';

describe('AccountstatementComponent', () => {
  let component: AccountstatementComponent;
  let fixture: ComponentFixture<AccountstatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountstatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountstatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
