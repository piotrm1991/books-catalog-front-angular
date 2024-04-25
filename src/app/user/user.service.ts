import { Injectable } from '@angular/core';
import { environment } from '../util/constants/environment';
import { ApiPaths } from '../util/constants/api.paths';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const pageString = "?page=";

const pageSizeString = "&size=";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;
  private resourcePath = ApiPaths.USERS_PATH;

  constructor(
    private http : HttpClient
  ) { }

  public getAllByPageSize(page : number, size : number): Observable<any> {

    return this.http.get(this.generateGetAllUrl(page, size));
  }

  private generateGetAllUrl(pageNumber : number, pageSize : number): string {

    return `${this.baseUrl}${this.resourcePath}${pageString}${pageNumber}${pageSizeString}${pageSize}`;
  }

  private generateBaseUrl(): string {

    return `${this.baseUrl}${this.resourcePath}`;
  }

  private generateEntityByIdUrl(id: number): string {

    return `${this.baseUrl}${this.resourcePath}\\${id}`;
  }

  public getEntityById(id: number): Observable<any> {

    return this.http.get(this.generateEntityByIdUrl(id));
  }

  public saveUpdatedEntity(id: any, userData: any): Observable<any> {

    return this.http.put(this.generateEntityByIdUrl(id), userData);
  }

  public deleteEntityById(id: number): Observable<any> {
    
    return this.http.delete(this.generateEntityByIdUrl(id));
  }

  public saveEntity(userData: any): Observable<any> {

    return this.http.post(this.generateBaseUrl(), userData);
  }
}
