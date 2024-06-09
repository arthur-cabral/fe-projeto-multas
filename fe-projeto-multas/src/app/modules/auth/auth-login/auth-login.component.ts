import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/models/auth/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent {
  loginForm: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login();
    } else {
      console.log('Formulário inválido');
    }
  }

  login() {
    const login: LoginModel = this.loginForm.value;
    this.authService.login(login).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Login efetuado com sucesso!',
          showConfirmButton: false,
          timer: 2000
        });
        setTimeout(() => {
          window.location.href = '/multas/listar';
        }, 1500);
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao efetuar login!',
          text: error.error
        });
      }
    })
  }

  changeVisibilityPassword(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
}
