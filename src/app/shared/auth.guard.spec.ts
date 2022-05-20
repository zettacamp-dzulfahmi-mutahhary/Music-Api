import { Token } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
  });

  afterEach(()=>{
    localStorage.removeItem('token')
  })

  it('should return true if there is token in local storage', () => {
    localStorage.setItem('token', '12345')
    expect(AuthGuard).toBeTruthy();
  });

  it('should return false if there is token in local storage', () => {
    expect(AuthGuard).toBeFalsy();
  });
});
