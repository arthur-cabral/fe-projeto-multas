import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from 'src/app/models/user/userModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  displayedColumns: string[] = ['id', 'userName', 'email', 'acoes'];
  dataSource = new MatTableDataSource<UserModel>();

  constructor(
    private userService: UserService
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

  onEdit(id: number) {
    console.log(`Editar multa com ID: ${id}`);
  }

  onDelete(id: string) {
    console.log(`Excluir usuario com ID: ${id}`);
    this.dataSource.data = this.dataSource.data.filter(user => user.id !== id);
  }
}
