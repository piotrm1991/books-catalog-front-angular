import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/_services/storage.service';
import { environment } from 'src/app/util/constants/environment';
import { ShelfService } from '../shelf.service';
import { Shelf } from 'src/app/_models/shelf';
import { AppPaths } from 'src/app/util/constants/app.paths';
import { ShelfPopupComponent } from '../shelf.popup/shelf.popup.component';
import { ModelList } from 'src/app/util/constants/model.list';
import { Roles } from 'src/app/user/enums/roles';

@Component({
  selector: 'app-shelf.list',
  templateUrl: './shelf.list.component.html',
  styleUrl: './shelf.list.component.css'
})
export class ShelfListComponent implements AfterViewInit {
  
  private animationTimings = environment.dialogAnimationTimings;

  pageSizeOptions = [5, 10, 15];

  displayedColumns: string[] = 
  [
    'id', 
    'letter',
    'number',
    'room',
    'actions'
  ];

  userList: Shelf[] = [];
  dataSource: any;
  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (
    private service:                ShelfService, 
    private toastr:                 ToastrService, 
    private storage:                StorageService, 
    private router:                 Router,
    private dialogBox:              MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Shelf>();
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private loadData(): void {
    this.service.getAllByPageAndSize(this.pageIndex, this.pageSize).subscribe({
      next: (data) => {
        this.totalItems = data.totalElements;
        this.dataSource = new MatTableDataSource<Shelf>(data.content);
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

  private openDialog(enteranimation: any, exitanimation: any, id: number): void {
    const popup = this.dialogBox.open(ShelfPopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        id: id,
        allowedRoles: [
          Roles.ADMIN_ROLE,
          Roles.USER_ROLE
        ],
        model: ModelList.SHELF
      }
    });
    popup.afterClosed().subscribe(() => {
      this.loadData();
    });
  }
}
