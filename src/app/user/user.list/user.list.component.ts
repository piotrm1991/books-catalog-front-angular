import { Component, ViewChild  } from '@angular/core';
import { UserService } from '../user.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/_services/storage.service';
import { Router } from '@angular/router';
import { AppPaths } from 'src/app/util/app.paths';

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

  constructor (
    private service:  UserService, 
    private toastr:   ToastrService, 
    private storage:  StorageService, 
    private router:   Router
  ) {

    this.loadUsers();
  }

  private loadUsers(): void {
    this.service.getAllUsers(this.page, this.size).subscribe({
      next: (data) => {
        this.userList = data;
        this.dataSource = new MatTableDataSource(this.userList.content);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        this.storage.logOut();
        this.router.navigate([AppPaths.LOGIN_PATH]);
        this.toastr.error('Session ended!', '', {
          positionClass: 'toast-top-center'
        });
      }
    });
  }

  editUser(id: number) {

  }

  deleteUser(id: number) {

  }
}
