import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  constructor(
    private authService: AuthService
  ) { }

  logout() {
    this.authService.logout();
    window.location.href = '/auth/login';
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
