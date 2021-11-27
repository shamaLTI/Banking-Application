import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallcustomersbyaccnoComponent } from './getallcustomersbyaccno.component';

describe('GetallcustomersbyaccnoComponent', () => {
  let component: GetallcustomersbyaccnoComponent;
  let fixture: ComponentFixture<GetallcustomersbyaccnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetallcustomersbyaccnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetallcustomersbyaccnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
