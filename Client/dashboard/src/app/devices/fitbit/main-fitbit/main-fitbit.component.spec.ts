import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFitbitComponent } from './main-fitbit.component';

describe('MainFitbitComponent', () => {
  let component: MainFitbitComponent;
  let fixture: ComponentFixture<MainFitbitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainFitbitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainFitbitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
