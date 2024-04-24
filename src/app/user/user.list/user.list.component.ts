import { AfterViewInit, Component, ViewChild  } from '@angular/core';
import { UserService } from '../user.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/_services/storage.service';
import { Router } from '@angular/router';
import { AppPaths } from 'src/app/util/app.paths';
import { MatDialog } from '@angular/material/dialog';
import { UserPopupComponent } from '../popup/user.poup.component';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user.list',
  templateUrl: './user.list.component.html',
  styleUrls: ['./user.list.component.css'],
})
export class UserListComponent implements AfterViewInit {

  pageSizeOptions = [5, 10, 15];

  displayedColumns: string[] = 
  [
    'id', 
    'login', 
    'status', 
    'role', 
    'createDate', 
    'updateDate', 
    'deleteDate', 
    'actions'
  ];

  userList: User[] = [];
  dataSource: any;
  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (
    private service:    UserService, 
    private toastr:     ToastrService, 
    private storage:    StorageService, 
    private router:     Router,
    private dialogBox:  MatDialog
  ) {
    this.dataSource = new MatTableDataSource<User>();
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public loadUsers(): void {
    this.service.getAllUsers(this.pageIndex, this.pageSize).subscribe({
      next: (data) => {
        this.totalItems = data.totalElements;
        this.dataSource = new MatTableDataSource<User>(data.content);
        console.log(data);
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
    this.openDialog('1000ms', '600ms', id);
  }

  deleteUser(id: number) {
    this.service.disableUserById(id).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (data) => {
        if (data.error) {
          data.error.errors.forEach((err: string) => {
            this.toastr.warning(err);
          });
        }
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log(event);
    this.loadUsers();
  }

  private openDialog(enteranimation: any, exitanimation: any, id: number) {
    const popup = this.dialogBox.open(UserPopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        userId: id
      }
    });
    popup.afterClosed().subscribe(() => {
      this.loadUsers();
    });
  }
}
