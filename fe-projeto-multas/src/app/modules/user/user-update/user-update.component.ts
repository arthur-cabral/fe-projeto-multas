import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.scss'
})
export class UserUpdateComponent {
  editForm: FormGroup;
  userId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.editForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUserById(this.userId).subscribe(user => {
      this.editForm.patchValue(user);
    });
  }

  async onSubmit(): Promise<void> {
    console.log(this.editForm.value);
    if (this.editForm.valid) {
      await this.userService.putUser(this.userId, this.editForm.value).subscribe({
        next: () => {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Usuário atualizado com sucesso!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.router.navigate(['/user/listar']);
        },
        error: (err) => {
          console.log(err)
          Swal.fire({
            title: 'Erro ao atualizar usuário!',
            text: err.error[0].description,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  }
}
