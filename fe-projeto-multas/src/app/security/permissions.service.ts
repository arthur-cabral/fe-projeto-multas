import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userRoles = this.getUserRoles();
    const expectedRole = next.data['role'];

    if (this.hasPermission(userRoles, expectedRole)) {
      return true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Sem permissão',
        text: 'Você não tem permissão para acessar essa página',
        showConfirmButton: true,
      });
      this.router.navigate(['/multas']);
      return false;
    }
  }

  private getUserRoles(): string | null {
    return this.authService.getRoles();
  }

  private hasPermission(userRoles: string | null, expectedRole: string): boolean {
    if (!userRoles) {
      return false;
    }

    return userRoles.includes(expectedRole);
  }
}
