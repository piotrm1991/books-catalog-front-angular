import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StatusType } from 'src/app/_models/status.type';
import { StatusTypeService } from '../status.type.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/_services/storage.service';
import { AppPaths } from 'src/app/_constants/app.paths';
import { GenericPopupComponent } from 'src/app/_util/generic.popup/generic.popup.component';
import { ModelList } from 'src/app/_constants/model.list';
import { Roles } from 'src/app/user/enums/roles';

@Component({
  selector: 'app-list',
  templateUrl: './status.type.list.component.html',
  styleUrl: './status.type.list.component.css'
})
export class StatusTypeListComponent implements AfterViewInit {

  pageSizeOptions = [5, 10, 15];

  displayedColumns: string[] = 
  [
    'id', 
    'name',
    'actions'
  ];

  userList: StatusType[] = [];
  dataSource: any;
  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (
    private service:                StatusTypeService, 
    private toastr:                 ToastrService, 
    private storage:                StorageService, 
    private router:                 Router,
    private dialogBox:              MatDialog
  ) {
    this.dataSource = new MatTableDataSource<StatusType>();
    this.loadTypes();
  }

  private loadTypes(): void {
    this.service.getAllByPageAndSize(this.pageIndex, this.pageSize).subscribe({
      next: (data) => {
        this.totalItems = data.totalElements;
        this.dataSource = new MatTableDataSource<StatusType>(data.content);
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
    this.loadTypes();
  }

  protected editStatusType(id: number): void {
    this.openDialog('1000ms', '600ms', id);
  }

  protected deleteStatusType(id: number): void {
    this.service.deleteEntityById(id).subscribe({
      next: () => {
        this.loadTypes();
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
          Roles.ADMIN_ROLE
        ],
        model: ModelList.STATUS_TYPE
      }
    });
    popup.afterClosed().subscribe(() => {
      this.loadTypes();
    });
  }
}
