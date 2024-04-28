import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BookService } from '../book.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/_services/storage.service';
import { AppPaths } from 'src/app/_constants/app.paths';
import { environment } from 'src/app/_constants/environment';
import { Roles } from 'src/app/user/enums/roles';
import { Book } from 'src/app/_models/book';
import { BookPopupComponent } from '../popup/book.popup.component';

@Component({
  selector: 'app-book.list',
  templateUrl: './book.list.component.html',
  styleUrl: './book.list.component.css'
})
export class BookListComponent implements AfterViewInit {
  
  private animationTimings = environment.dialogAnimationTimings;

  pageSizeOptions = [5, 10, 15];

  displayedColumns: string[] = 
  [
    'id', 
    'title',
    'author',
    'publisher',
    'status',
    'placement',
    'actions'
  ];

  userList: Book[] = [];
  dataSource: any;
  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (
    private service:                BookService, 
    private toastr:                 ToastrService, 
    private storage:                StorageService, 
    private router:                 Router,
    private dialogBox:              MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Book>();
    this.loadBooks();
  }

  private loadBooks(): void {
    this.service.getAllByPageAndSize(this.pageIndex, this.pageSize).subscribe({
      next: (data) => {
        this.totalItems = data.totalElements;
        this.dataSource = new MatTableDataSource<Book>(data.content);
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
    this.loadBooks();
  }

  protected edit(id: number): void {
    this.openDialog(this.animationTimings.openAnimationTime, this.animationTimings.closeAnimationTime, id);
  }

  protected delete(id: number): void {
    this.service.deleteEntityById(id).subscribe({
      next: () => {
        this.loadBooks();
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
    const popup = this.dialogBox.open(BookPopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        id: id,
        allowedRoles: [
          Roles.ADMIN_ROLE,
          Roles.USER_ROLE
        ]
      }
    });
    popup.afterClosed().subscribe(() => {
      this.loadBooks();
    });
  }
}
