import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialParaEspecialistaComponent } from './historial-para-especialista.component';

describe('HistorialParaEspecialistaComponent', () => {
  let component: HistorialParaEspecialistaComponent;
  let fixture: ComponentFixture<HistorialParaEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialParaEspecialistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialParaEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
