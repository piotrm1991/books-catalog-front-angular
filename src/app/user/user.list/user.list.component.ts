import { Component, ViewChild  } from '@angular/core';
import { UserService } from '../user.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private service: UserService) {
    this.loadUsers();
  }

  loadUsers() {
    this.service.getAllUsers(this.page, this.size).subscribe(res => {
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList.content);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editUser(id: number) {

  }

  deleteUser(id: number) {

  }
}
