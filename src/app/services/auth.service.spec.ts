import { TestBed } from '@angular/core/testing';
import { AuthService, User } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial user logged in', () => {
    expect(service.isLoggedIn()).toBe(true);
  });

  it('should get current user', () => {
    const user = service.getCurrentUser();
    expect(user).toBeTruthy();
    expect(user?.name).toBe('João Silva');
    expect(user?.email).toBe('joao@empresa.com');
    expect(user?.role).toBe('admin');
  });

  it('should check if user is admin', () => {
    expect(service.isAdmin()).toBe(true);
  });

  it('should login with valid credentials', async () => {
    const result = await service.login('admin@empresa.com', '123456');
    expect(result).toBe(true);
  });

  it('should fail login with invalid credentials', async () => {
    const result = await service.login('invalid@email.com', 'wrongpassword');
    expect(result).toBe(false);
  });

  it('should logout user', () => {
    service.logout();
    expect(service.isLoggedIn()).toBe(false);
    expect(service.getCurrentUser()).toBeNull();
    expect(service.isAdmin()).toBe(false);
  });

  it('should emit current user changes', (done) => {
    service.currentUser$.subscribe(user => {
      expect(user).toBeTruthy();
      expect(user?.name).toBe('João Silva');
      done();
    });
  });

  it('should emit null after logout', (done) => {
    service.logout();
    service.currentUser$.subscribe(user => {
      expect(user).toBeNull();
      done();
    });
  });
}); 