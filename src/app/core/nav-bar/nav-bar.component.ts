import { Component, DoCheck } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { StorageService } from 'src/app/_services/storage.service';
import { ShelfPopupComponent } from 'src/app/shelf/shelf.popup/shelf.popup.component';
import { UserPopupComponent } from 'src/app/user/popup/user.popup.component';
import { AppPaths } from 'src/app/util/constants/app.paths';
import { environment } from 'src/app/util/constants/environment';
import { ModelList } from 'src/app/util/constants/model.list';
import { Roles } from 'src/app/user/enums/roles';
import { GenericPopupComponent } from 'src/app/util/generic.popup/generic.popup.component';
import { BookPopupComponent } from 'src/app/book/popup/book.popup.component';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements DoCheck {

  protected showButtons = false;
  private animationTimings = environment.dialogAnimationTimings;

  constructor(
    private service:    AuthenticationService,
    private storage:    StorageService,
    private router:     Router,
    private dialogBox:  MatDialog
  ) {}

  ngDoCheck(): void {
    if (this.storage.checkIfLoggedIn()) {
      if (this.storage.getCurrentUserRole() == Roles.ADMIN_ROLE) {
        this.showButtons = true;
      }
    }
  }

  protected addNewUser(): void {
    this.openDialogAddUser(this.animationTimings.openAnimationTime, this.animationTimings.closeAnimationTime);
  }

  protected addNewStatusType(): void {
    this.openDialogGenericPopup(this.animationTimings.openAnimationTime, this.animationTimings.closeAnimationTime, [Roles.ADMIN_ROLE], ModelList.STATUS_TYPE, AppPaths.STATUS_TYPES_PATH);
  }

  protected addNewAuthor(): void {
    this.openDialogGenericPopup(this.animationTimings.openAnimationTime, this.animationTimings.closeAnimationTime, [Roles.ADMIN_ROLE, Roles.USER_ROLE], ModelList.AUTHOR, AppPaths.AUTHORS_PATH);
  }

  protected addNewPublisher(): void {
    this.openDialogGenericPopup(this.animationTimings.openAnimationTime, this.animationTimings.closeAnimationTime, [Roles.ADMIN_ROLE, Roles.USER_ROLE], ModelList.PUBLISHER, AppPaths.PUBLISHERS_PATH);
  }

  protected addNewRoom(): void {
    this.openDialogGenericPopup(this.animationTimings.openAnimationTime, this.animationTimings.closeAnimationTime, [Roles.ADMIN_ROLE, Roles.USER_ROLE], ModelList.ROOM, AppPaths.ROOMS_PATH);
  }

  protected addNewShelf(): void {
    this.openDialogAddShelf(this.animationTimings.openAnimationTime, this.animationTimings.closeAnimationTime);
  }

  protected addNewBook(): void {
    this.openDialogAddBook(this.animationTimings.openAnimationTime, this.animationTimings.closeAnimationTime);
  }

  private openDialogAddBook(enteranimation: any, exitanimation: any) {
    const popup = this.dialogBox.open(BookPopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '40%',
      data: {
        id: null
      }
    });
    popup.afterClosed().subscribe(() => {
      if (this.router.url == "/" + AppPaths.BOOKS_PATH) {
        window.location.reload();
      }
    });
  }

  private openDialogAddUser(enteranimation: any, exitanimation: any) {
    const popup = this.dialogBox.open(UserPopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '40%',
      data: {
        userId: null
      }
    });
    popup.afterClosed().subscribe(() => {
      if (this.router.url == "/" + AppPaths.USERS_PATH) {
        window.location.reload();
      }
    });
  }

  private openDialogAddShelf(enteranimation: any, exitanimation: any) {
    const popup = this.dialogBox.open(ShelfPopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '40%',
      data: {
        id: null
      }
    });
    popup.afterClosed().subscribe(() => {
      if (this.router.url == "/" + AppPaths.SHELVES_PATH) {
        window.location.reload();
      }
    });
  }

  private openDialogGenericPopup(enteranimation: any, exitanimation: any, roles: string[], model: string, path: string) {
    const popup = this.dialogBox.open(GenericPopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '40%',
      data: {
        id: null,
        allowedRoles: roles,
        model: model
      }
    });
    popup.afterClosed().subscribe(() => {
      if (this.router.url == "/" + path) {
        window.location.reload();
      }
    });
  }

  protected logout() {
    this.service.logout().subscribe(() =>{
      this.storage.logOut();
      this.router.navigate([AppPaths.LOGIN_PATH]);
    });
  }
}
