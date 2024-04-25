import { Injectable } from '@angular/core';
import { environment } from '../util/constants/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiPaths } from '../util/constants/api.paths';
import { DataServiceInterface } from '../util/data.service.interface';

const pageString = "?page=";

const pageSizeString = "&size=";

@Injectable({
  providedIn: 'root'
})
export class RoomService implements DataServiceInterface {

  private baseUrl = environment.baseUrl;
  private resourcePath = ApiPaths.ROOMS_PATH;

  constructor(
    private http : HttpClient
  ) { }

  public getAllByPageAndSize(page : number, size : number): Observable<any> {

    return this.http.get(this.generateGetAllUrl(page, size));
  }

  private generateGetAllUrl(pageNumber : number, pageSize : number): string {

    return `${this.baseUrl}${this.resourcePath}${pageString}${pageNumber}${pageSizeString}${pageSize}`;
  }

  public getEntityById(id: number): Observable<any> {

    return this.http.get(this.generateEntityByIdUrl(id));
  }
  
  private generateEntityByIdUrl(id: number): string {

    return `${this.baseUrl}${this.resourcePath}\\${id}`;
  }

  public saveEntity(data: any): Observable<any> {

    return this.http.post(this.generateBaseUrl(), data);
  }

  private generateBaseUrl(): string {

    return `${this.baseUrl}${this.resourcePath}`;
  }

  public saveUpdatedEntity(id: any, data: any): Observable<any> {

    return this.http.put(this.generateEntityByIdUrl(id), data);
  }

  public deleteEntityById(id: number): Observable<any> {
    
    return this.http.delete(this.generateEntityByIdUrl(id));
  }
}
