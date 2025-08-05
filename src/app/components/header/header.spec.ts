import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';

import { HeaderComponent } from './header';
import { AuthService, User } from '../../services/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  const mockUser: User = {
    id: 1,
    name: 'João Silva',
    email: 'joao@empresa.com',
    role: 'admin'
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['logout', 'getCurrentUser'], {
      currentUser$: new BehaviorSubject<User | null>(mockUser)
    });

    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HeaderComponent
      ],
      providers: [
        { provide: AuthService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with current user observable', () => {
    expect(component.currentUser$).toBeTruthy();
  });

  it('should call logout on auth service', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should get current user from auth service', () => {
    authService.getCurrentUser.and.returnValue(mockUser);
    
    const result = component.getCurrentUser();
    
    expect(authService.getCurrentUser).toHaveBeenCalled();
    expect(result).toEqual(mockUser);
  });

  it('should display user information in template', () => {
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('João Silva');
    expect(compiled.textContent).toContain('admin');
  });

  it('should emit user changes through observable', (done) => {
    component.currentUser$.subscribe(user => {
      expect(user).toEqual(mockUser);
      done();
    });
  });
}); 