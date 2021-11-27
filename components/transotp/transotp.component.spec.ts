import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransotpComponent } from './transotp.component';

describe('TransotpComponent', () => {
  let component: TransotpComponent;
  let fixture: ComponentFixture<TransotpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransotpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
