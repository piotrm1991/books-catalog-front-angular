import { Injectable } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { environment } from '../util/environment';
import { ApiPaths } from '../util/api.paths';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const pageString = "?page=";

const pageSizeString = "&size=";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;

  constructor(
    private http : HttpClient
  ) { }

  public getAllUsers(page : number, size : number): Observable<any> {

    return this.http.get(this.generateGetAllUsersUrl(page, size));
  }

  private generateGetAllUsersUrl(pageNumber : number, pageSize : number): string {

    return `${this.baseUrl}${ApiPaths.USERS_PATH}${pageString}${pageNumber}${pageSizeString}${pageSize}`;
  }

  private generateUserByIdUrl(id: number): string {

    return `${this.baseUrl}${ApiPaths.USERS_PATH}\\${id}`;
  }

  public getUserById(id: number): Observable<any> {

    return this.http.get(this.generateUserByIdUrl(id));
  }

  public saveUpdatedUser(id: any, userData: any): Observable<any> {

    return this.http.put(this.generateUserByIdUrl(id), userData);
  }
}
