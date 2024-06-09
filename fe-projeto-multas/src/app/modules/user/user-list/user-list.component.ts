import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user/userModel';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  displayedColumns: string[] = ['id', 'userName', 'email', 'acoes'];
  dataSource = new MatTableDataSource<UserModel>();

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource<UserModel>();
  }

  async ngOnInit() {
    await this.getAllUsers();
  }

  async getAllUsers() {
    await this.userService.getAllUsers().subscribe(users => {
      this.dataSource.data = users;
    });
  }

  onEdit(id: string) {
    this.router.navigate(['/user/editar', id]);
  }

  async onDelete(id: string) {
    await this.userService.getUserById(id).subscribe({
      next: (user) => {
        Swal.fire({
          title: 'Excluir usuário',
          text: `Deseja realmente excluir o usuário de id ${user.id}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim',
          cancelButtonText: 'Não'
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteMulta(id);
          }
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao excluir usuário',
          text: error.error,
          showConfirmButton: true
        });
      }
    });
  }

  async deleteMulta(id: string) {
    await this.userService.deleteUser(id).subscribe({
      next: () => {
        this.getAllUsers();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao excluir usuário',
          text: 'Você não tem permissão para excluir multas',
          showConfirmButton: true
        });
      }
    });
  }
}
