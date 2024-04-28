import { environment } from '../_constants/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataServiceInterface } from './data.service.interface';

/**
 * Generic Api Service that holds logic for preparing and sending HttpRequests.
 */
export class GenericApiService implements DataServiceInterface {

  private readonly baseUrl = environment.baseUrl;

  private readonly pageString = "?page=";

  private readonly pageSizeString = "&size=";

  private readonly API_ROUTES = {
    getAll: () => `${this.baseUrl}${this.resourcePath}`,
    getAllByPageAndSize: (page: number, size: number) => `${this.baseUrl}${this.resourcePath}${this.pageString}${page}${this.pageSizeString}${size}`,
    getEntityUrlById: (id: number) => `${this.baseUrl}${this.resourcePath}\\${id}`
  };

  constructor(
    private http: HttpClient,
    private resourcePath: string
  ) { }

  public getAllByPageAndSize(page: number, size: number): Observable<any> {

    return this.http.get(this.API_ROUTES.getAllByPageAndSize(page, size));
  }

  public getAll(): Observable<any> {

    return this.http.get(this.API_ROUTES.getAll());
  }

  public getEntityById(id: number): Observable<any> {

    return this.http.get(this.API_ROUTES.getEntityUrlById(id));
  }

  public saveEntity(data: any): Observable<any> {

    return this.http.post(this.API_ROUTES.getAll(), data);
  }

  public saveUpdatedEntity(id: any, data: any): Observable<any> {

    return this.http.put(this.API_ROUTES.getEntityUrlById(id), data);
  }

  public deleteEntityById(id: number): Observable<any> {

    return this.http.delete(this.API_ROUTES.getEntityUrlById(id));
  }
}
