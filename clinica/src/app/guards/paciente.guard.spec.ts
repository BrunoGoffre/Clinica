import { TestBed } from '@angular/core/testing';

import { PacienteGuard } from './paciente.guard';

describe('PacienteGuardGuard', () => {
  let guard: PacienteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PacienteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
