import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-user.list',
  templateUrl: './user.list.component.html',
  styleUrls: ['./user.list.component.css']
})
export class UserListComponent {

  displayedColumns: string[] = ['id', 'login', 'status', 'createDate', 'updateDate', 'deleteDate', 'action'];

  userList: any;
  page: number = 0;
  size: number = 5;
  dataSource: any;

  constructor (private service: UserService) {
    this.loadUsers();
  }

  loadUsers() {
    this.service.getAllUsers(this.page, this.size).subscribe(res => {
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList.content);
    });
  }

  editUser(id: number) {

  }

  deleteUser(id: number) {

  }
}
