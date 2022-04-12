import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRingComponent } from './main-ring.component';

describe('MainRingComponent', () => {
  let component: MainRingComponent;
  let fixture: ComponentFixture<MainRingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainRingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainRingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
