import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

    private isLoggedIn = false;

    constructor(){}

    public checkIfLoggedIn() :boolean {
        return this.isLoggedIn;
    }

    public setLoggedInStatus(status: boolean) {
        this.isLoggedIn = status;
    }
}

