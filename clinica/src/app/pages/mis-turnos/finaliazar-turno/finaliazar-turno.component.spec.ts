import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinaliazarTurnoComponent } from './finaliazar-turno.component';

describe('FinaliazarTurnoComponent', () => {
  let component: FinaliazarTurnoComponent;
  let fixture: ComponentFixture<FinaliazarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinaliazarTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinaliazarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
