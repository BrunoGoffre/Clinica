import { TestBed } from '@angular/core/testing';

import { EspecialistaGuard } from './especialista.guard';

describe('EspecialistaGuardGuard', () => {
  let guard: EspecialistaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EspecialistaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
