import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(): boolean {
    const isAuthenticated = this.authService.isLoggedIn();

    if (isAuthenticated) {
      const user = this.authService.getCurrentUser();
      return true;
    } else {
      alert(`🔐 Área protegida!

Para acessar esta funcionalidade, você precisa estar logado.
Em um cenário real, você seria redirecionado para a página de login.

Usuário simulado: admin@empresa.com / 123456`);

      return true;
    }
  }
}
