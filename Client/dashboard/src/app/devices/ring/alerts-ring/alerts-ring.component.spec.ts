import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsRingComponent } from './alerts-ring.component';

describe('AlertsRingComponent', () => {
  let component: AlertsRingComponent;
  let fixture: ComponentFixture<AlertsRingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertsRingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsRingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
