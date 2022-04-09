import { TestBed } from '@angular/core/testing';

import { CheckSesionGuard } from './check-sesion.guard';

describe('CheckSesionGuard', () => {
  let guard: CheckSesionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckSesionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
