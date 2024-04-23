import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { StorageService } from 'src/app/_services/storage.service';
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
    private service:  AuthenticationService,
    private storage:  StorageService,
    private router:   Router
  ) {}

  ngDoCheck(): void {
    if (this.storage.checkIfLoggedIn()) {
      if (this.storage.getCurrentUserRole() == Roles.ADMIN_ROLE) {
        this.showButtons = true;
      }
    }
  }

  logout() {
    this.service.logout().subscribe(() =>{
      this.storage.logOut();
      this.router.navigate([AppPaths.LOGIN_PATH]);
    });
  }
}
