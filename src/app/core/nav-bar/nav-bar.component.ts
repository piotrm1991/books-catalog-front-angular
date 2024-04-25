import { Component, DoCheck } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { StorageService } from 'src/app/_services/storage.service';
import { UserPopupComponent } from 'src/app/user/popup/user.popup.component';
import { AppPaths } from 'src/app/util/constants/app.paths';
import { Models } from 'src/app/util/constants/model';
import { Roles } from 'src/app/util/constants/roles';
import { GenericPopupComponent } from 'src/app/util/generic.popup/generic.popup.component';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements DoCheck {

  showButtons = false;

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
    this.openDialogAddUser('1000ms', '600ms');
  }

  protected addNewStatusType(): void {
    this.openDialogStatusType('1000ms', '600ms');
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

  private openDialogStatusType(enteranimation: any, exitanimation: any) {
    const popup = this.dialogBox.open(GenericPopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '40%',
      data: {
        id: null,
        allowedRole: Roles.ADMIN_ROLE,
        model: Models.STATUS_TYPE
      }
    });
    popup.afterClosed().subscribe(() => {
      if (this.router.url == "/" + AppPaths.STATUS_TYPES_PATH) {
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
