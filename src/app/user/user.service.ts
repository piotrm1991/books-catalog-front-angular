import { Injectable } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { environment } from '../util/environment';
import { ApiPaths } from '../util/api.paths';
import { HttpClient } from '@angular/common/http';

const pageString = "?page=";

const pageSizeString = "&size=";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;

  constructor(private http : HttpClient, private service: AuthenticationService) { }

  // getAllUsers(page : number, size : number): Observable<User[]> {
  //   return this.http.get(this.generateUrlUsers(page, size)).pipe(map((res : any) => res));
  // }

  getAllUsers(page : number, size : number) {
    return this.http.get(this.generateUrlUsers(page, size));
  }

  private generateUrlUsers(pageNumber : number, pageSize : number) : string {
    return `${this.baseUrl}${ApiPaths.Users}${pageString}${pageNumber}${pageSizeString}${pageSize}`;
  }
}
