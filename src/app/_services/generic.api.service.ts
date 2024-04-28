import { environment } from '../_constants/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataServiceInterface } from './data.service.interface';

const pageString = "?page=";

const pageSizeString = "&size=";

export class GenericApiService implements DataServiceInterface {

  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private resourcePath: string
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
