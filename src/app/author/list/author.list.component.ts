import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/_services/storage.service';
import { AppPaths } from 'src/app/util/constants/app.paths';
import { GenericPopupComponent } from 'src/app/util/generic.popup/generic.popup.component';
import { ModelList } from 'src/app/util/constants/model.list';
import { Roles } from 'src/app/user/enums/roles';
import { AuthorService } from '../author.service';
import { Author } from 'src/app/_models/author';
import { environment } from 'src/app/util/constants/environment';

@Component({
  selector: 'app-author-list',
  templateUrl: './author.list.component.html',
  styleUrl: './author.list.component.css'
})
export class AuthorListComponent implements AfterViewInit {
  
  private animationTimings = environment.dialogAnimationTimings;

  pageSizeOptions = [5, 10, 15];

  displayedColumns: string[] = 
  [
    'id', 
    'name',
    'actions'
  ];

  userList: Author[] = [];
  dataSource: any;
  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (
    private service:                AuthorService, 
    private toastr:                 ToastrService, 
    private storage:                StorageService, 
    private router:                 Router,
    private dialogBox:              MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Author>();
    this.loadAuthors();
  }

  private loadAuthors(): void {
    this.service.getAllByPageAndSize(this.pageIndex, this.pageSize).subscribe({
      next: (data) => {
        this.totalItems = data.totalElements;
        this.dataSource = new MatTableDataSource<Author>(data.content);
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
    this.loadAuthors();
  }

  protected editAuthor(id: number): void {
    this.openDialog(this.animationTimings.openAnimationTime, this.animationTimings.closeAnimationTime, id);
  }

  protected deleteAuthor(id: number): void {
    this.service.deleteEntityById(id).subscribe({
      next: () => {
        this.loadAuthors();
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
        model: ModelList.AUTHOR
      }
    });
    popup.afterClosed().subscribe(() => {
      this.loadAuthors();
    });
  }
}
