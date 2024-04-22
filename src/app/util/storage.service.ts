import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

const SESSION_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

    private isLoggedIn = false;

    constructor(private cookieService: CookieService){}

    public logOut() {
        this.isLoggedIn = false;
        window.sessionStorage.clear();
    }

    public checkIfLoggedIn() :boolean {
        if(window.sessionStorage.getItem(SESSION_KEY) != null) {
            this.isLoggedIn = true;
            return this.isLoggedIn;
        } else {
            return false;
        }
    }

    public logIn() {
        this.isLoggedIn = true;
        window.sessionStorage.setItem(SESSION_KEY, this.cookieService.get('JSESSIONID'));
    }
}

