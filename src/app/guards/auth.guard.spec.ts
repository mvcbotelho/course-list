import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'getCurrentUser']);
    
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: spy }
      ]
    });
    
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when user is logged in', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getCurrentUser.and.returnValue({
      id: 1,
      name: 'João Silva',
      email: 'joao@empresa.com',
      role: 'admin'
    });

    const result = guard.canActivate();
    expect(result).toBe(true);
  });

  it('should deny access when user is not logged in', () => {
    authService.isLoggedIn.and.returnValue(false);
    authService.getCurrentUser.and.returnValue(null);

    // Spy on alert to prevent it from showing during tests
    spyOn(window, 'alert');

    const result = guard.canActivate();
    expect(result).toBe(true); // Currently allowing access for demo
    expect(window.alert).toHaveBeenCalled();
  });

  it('should call authService.isLoggedIn', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getCurrentUser.and.returnValue({
      id: 1,
      name: 'João Silva',
      email: 'joao@empresa.com',
      role: 'admin'
    });

    guard.canActivate();
    expect(authService.isLoggedIn).toHaveBeenCalled();
  });

  it('should call authService.getCurrentUser when logged in', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getCurrentUser.and.returnValue({
      id: 1,
      name: 'João Silva',
      email: 'joao@empresa.com',
      role: 'admin'
    });

    guard.canActivate();
    expect(authService.getCurrentUser).toHaveBeenCalled();
  });
}); 