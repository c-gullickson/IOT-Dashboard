import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusRokuComponent } from './status-roku.component';

describe('StatusRokuComponent', () => {
  let component: StatusRokuComponent;
  let fixture: ComponentFixture<StatusRokuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusRokuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusRokuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
