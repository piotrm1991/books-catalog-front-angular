import { Component, DoCheck } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { StorageService } from 'src/app/_services/storage.service';
import { UserPopupComponent } from 'src/app/user/popup/user.poup.component';
import { AppPaths } from 'src/app/util/app.paths';
import { Roles } from 'src/app/util/roles';

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
    this.openDialog('1000ms', '600ms');
  }

  private openDialog(enteranimation: any, exitanimation: any) {
    const popup = this.dialogBox.open(UserPopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        userId: null
      }
    });
    if (this.router.url == AppPaths.USERS_PATH) {
      popup.afterClosed().subscribe(() => {
        this.router.navigate([AppPaths.USERS_PATH]);
      });
    }
  }

  protected logout() {
    this.service.logout().subscribe(() =>{
      this.storage.logOut();
      this.router.navigate([AppPaths.LOGIN_PATH]);
    });
  }
}
