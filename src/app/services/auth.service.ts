import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>({
    id: 1,
    name: 'João Silva',
    email: 'joao@empresa.com',
    role: 'admin'
  });

  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {}

  isLoggedIn(): boolean {
    const user = this.currentUserSubject.value;
    return user !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'admin@empresa.com' && password === '123456') {
          const user: User = {
            id: 1,
            name: 'Administrador',
            email: email,
            role: 'admin'
          };
          this.currentUserSubject.next(user);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === 'admin';
  }
}
