import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLightsComponent } from './main-lights.component';

describe('MainLightsComponent', () => {
  let component: MainLightsComponent;
  let fixture: ComponentFixture<MainLightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainLightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
