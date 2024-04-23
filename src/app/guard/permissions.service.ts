import { Injectable, inject  } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn , Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { AppPaths } from '../util/app.paths';
import { Roles } from '../util/roles';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
class PermissionsService  {

  constructor (
    private storage:  StorageService, 
    private router:   Router,
    private toastr:   ToastrService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | any {
      
    if (this.storage.checkIfLoggedIn()) {
      if (next.url.length > 0) {
        let urlPath = next.url[0].path;
        if (urlPath == AppPaths.USERS_PATH) {
          if (this.storage.getCurrentUserRole() == Roles.ADMIN_ROLE) {

            return true;
          } else {
            this.toastr.error('You are unauthorized for this content', '', {
              positionClass: 'toast-top-center'
            });
            this.router.navigate([AppPaths.HOME_PATH]);

            return false;
          }
        }
      } else {

        return true;
      }
    } else {
      this.router.navigate([AppPaths.LOGIN_PATH]);

      return false;
    }
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {

  return inject(PermissionsService).canActivate(next, state);
}
