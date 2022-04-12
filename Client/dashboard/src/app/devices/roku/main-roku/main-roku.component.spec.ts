import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRokuComponent } from './main-roku.component';

describe('MainRokuComponent', () => {
  let component: MainRokuComponent;
  let fixture: ComponentFixture<MainRokuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainRokuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainRokuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
