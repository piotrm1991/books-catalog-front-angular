import { Injectable, inject  } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn , Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../util/storage.service';

@Injectable({
  providedIn: 'root'
})
class PermissionsService  {

  constructor (private storage: StorageService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
    console.log('permissions ' + this.storage.checkIfLoggedIn());
      
    if (this.storage.checkIfLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state);
}
