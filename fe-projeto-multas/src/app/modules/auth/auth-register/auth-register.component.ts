import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from 'src/app/models/auth/registerModel';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrl: './auth-register.component.scss'
})
export class AuthRegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.register();
    } else {
      console.log('Formulário inválido');
    }
  }

  register() {
    const register: RegisterModel = this.registerForm.value;
    this.authService.register(register).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Cadastro efetuado com sucesso!',
          showConfirmButton: false,
          timer: 2000
        });
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 1500);
      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao efetuar o cadastro!',
          text: error.error
        });
      }
    })
  }
}
