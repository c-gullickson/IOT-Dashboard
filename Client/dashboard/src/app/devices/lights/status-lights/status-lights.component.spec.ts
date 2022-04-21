import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusLightsComponent } from './status-lights.component';

describe('StatusLightsComponent', () => {
  let component: StatusLightsComponent;
  let fixture: ComponentFixture<StatusLightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusLightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusLightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
