import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: router }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    localStorage.removeItem('neelgund-admin-token');
  });

  afterEach(() => {
    localStorage.removeItem('neelgund-admin-token');
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('redirects to login while preserving the requested route', () => {
    const state = { url: '/homepage/about-edit/6879fed1b3d16d9ae20c61de' } as RouterStateSnapshot;

    expect(guard.canActivate({} as ActivatedRouteSnapshot, state)).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  });

  it('allows access when an admin token exists', () => {
    localStorage.setItem('neelgund-admin-token', 'test-token');
    const state = { url: '/homepage/about-edit/6879fed1b3d16d9ae20c61de' } as RouterStateSnapshot;

    expect(guard.canActivate({} as ActivatedRouteSnapshot, state)).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
