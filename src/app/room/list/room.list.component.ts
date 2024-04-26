import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/_services/storage.service';
import { User } from 'src/app/_models/user';
import { AppPaths } from 'src/app/util/constants/app.paths';
import { GenericPopupComponent } from 'src/app/util/generic.popup/generic.popup.component';
import { ModelList } from 'src/app/util/constants/model.list';
import { Roles } from 'src/app/util/constants/roles';
import { environment } from 'src/app/util/constants/environment';
import { RoomService } from '../room.service';
import { Room } from 'src/app/_models/room';

@Component({
  selector: 'app-list',
  templateUrl: './room.list.component.html',
  styleUrl: './room.list.component.css'
})
export class RoomListComponent implements AfterViewInit {
  
  private animationTimings = environment.dialogAnimationTimings;

  pageSizeOptions = [5, 10, 15];

  displayedColumns: string[] = 
  [
    'id', 
    'name',
    'actions'
  ];

  userList: Room[] = [];
  dataSource: any;
  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (
    private service:                RoomService, 
    private toastr:                 ToastrService, 
    private storage:                StorageService, 
    private router:                 Router,
    private dialogBox:              MatDialog
  ) {
    this.dataSource = new MatTableDataSource<User>();
    this.loadData();
  }

  private loadData(): void {
    this.service.getAllByPageAndSize(this.pageIndex, this.pageSize).subscribe({
      next: (data) => {
        this.totalItems = data.totalElements;
        this.dataSource = new MatTableDataSource<User>(data.content);
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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  protected edit(id: number): void {
    this.openDialog(this.animationTimings.openAnimationTime, this.animationTimings.closeAnimationTime, id);
  }

  protected delete(id: number): void {
    this.service.deleteEntityById(id).subscribe({
      next: () => {
        this.loadData();
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

  private openDialog(enteranimation: any, exitanimation: any, id: number) {
    const popup = this.dialogBox.open(GenericPopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        id: id,
        allowedRoles: [
          Roles.ADMIN_ROLE,
          Roles.USER_ROLE
        ],
        model: ModelList.ROOM
      }
    });
    popup.afterClosed().subscribe(() => {
      this.loadData();
    });
  }
}
