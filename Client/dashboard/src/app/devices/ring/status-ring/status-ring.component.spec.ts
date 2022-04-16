import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusRingComponent } from './status-ring.component';

describe('StatusRingComponent', () => {
  let component: StatusRingComponent;
  let fixture: ComponentFixture<StatusRingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusRingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusRingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
