import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from '../util/constants/api.paths';
import { environment } from '../util/constants/environment';
import { DataServiceInterface } from '../util/data.service.interface';

const pageString = "?page=";

const pageSizeString = "&size=";

@Injectable({
  providedIn: 'root'
})
export class ShelfService implements DataServiceInterface {

  private baseUrl = environment.baseUrl;
  private resourcePath = ApiPaths.SHELVES_PATH;

  constructor(
    private http : HttpClient
  ) { }

  public getAllByPageAndSize(page : number, size : number): Observable<any> {

    return this.http.get(this.generateGetAllUrl(page, size));
  }

  private generateGetAllUrl(pageNumber : number, pageSize : number): string {

    return `${this.baseUrl}${this.resourcePath}${pageString}${pageNumber}${pageSizeString}${pageSize}`;
  }

  public getAll(): Observable<any> {

    return this.http.get(this.generateBaseUrl());
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
