import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyInputsRokuComponent } from './key-inputs-roku.component';

describe('KeyInputsRokuComponent', () => {
  let component: KeyInputsRokuComponent;
  let fixture: ComponentFixture<KeyInputsRokuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyInputsRokuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyInputsRokuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
