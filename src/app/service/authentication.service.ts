import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../util/environment';
import { ApiPaths } from '../util/api.paths';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = environment.baseUrl;

  constructor(private http : HttpClient) { }

  login(login: any, password: any): any  {
    let url = `${this.baseUrl}${ApiPaths.Login}`;
    return this.http.post(url, {}, {
      headers: this.prepareHeadersForBasicAuth(login, password),
      responseType: 'text'
    });
  };

  prepareHeadersForBasicAuth(login: string, password: string): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("X-Requested-With", "XMLHttpRequest");
    headers = headers.append("Authorization", 'Basic ' + window.btoa(login + ":" + password));
    return headers;
  }

  logout(): any {
    let url = `${this.baseUrl}${ApiPaths.Logout}`;
    return this.http.delete(url, {});
  }
}
