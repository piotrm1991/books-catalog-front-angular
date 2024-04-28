import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../_constants/environment';
import { ApiPaths } from '../_constants/api.paths';

/**
 * Service responsible for sending login and logout requests.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = environment.baseUrl;

  constructor(private http : HttpClient) { }

  login(login: any, password: any): any  {
    let url = `${this.baseUrl}${ApiPaths.LOGIN_PATH}`;
    return this.http.post(url, {}, {
      headers: this.prepareHeadersForBasicAuth(login, password),
      responseType: 'text'
    });
  };

  prepareHeadersForBasicAuth(login: string, password: string): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", 'Basic ' + window.btoa(login + ":" + password));
    return headers;
  }

  logout(): any {
    let url = `${this.baseUrl}${ApiPaths.LOGOUT_PATH}`;
    return this.http.delete(url, {});
  }

  getCurrentUserRole(): any {
    let url = `${this.baseUrl}${ApiPaths.CURRENT_ROLE}`;
    return this.http.get(url, {
      responseType: 'text'
    });
  }
}
