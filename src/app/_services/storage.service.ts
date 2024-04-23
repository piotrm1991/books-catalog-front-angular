import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppPaths } from '../util/app.paths';

const SESSION_KEY = 'session_key';
const CURRENT_ROLE = 'current_role';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

    constructor(
        private cookieService: CookieService, 
        private service: AuthenticationService, 
        private router: Router, 
        private toastr: ToastrService
    ) {}

    public logOut() {
        window.sessionStorage.removeItem(SESSION_KEY);
        window.sessionStorage.removeItem(CURRENT_ROLE);
    }

    public checkIfLoggedIn() :boolean {
        if(window.sessionStorage.getItem(SESSION_KEY) != null) {

            return true;
        } else {
            
            return false;
        }
    }

    public logIn(): void {
        window.sessionStorage.setItem(SESSION_KEY, this.cookieService.get('JSESSIONID'));
        this.setCurrentUserRole();
    }

    public getCurrentUserRole(): string | any {
        if(window.sessionStorage.getItem(CURRENT_ROLE) == null) {

            this.setCurrentUserRole();
        } 

        return window.sessionStorage.getItem(CURRENT_ROLE);
    }

    private setCurrentUserRole(): void {
        this.service.getCurrentUserRole().subscribe({
            next: (data : any) => {
                window.sessionStorage.setItem(CURRENT_ROLE, data);
            },
            error: () => {
              this.logOut();
              this.toastr.error('Error occured', '', {
                positionClass: 'toast-top-center'
              });
              this.router.navigate([AppPaths.LOGIN_PATH]);
            }
        });
    }
}

