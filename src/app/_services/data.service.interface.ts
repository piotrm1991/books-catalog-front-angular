import { Observable } from "rxjs";

/**
 * Interface for the service responsible for api requests.
 */
export interface DataServiceInterface {
    getAllByPageAndSize(page: number, size: number): Observable<any>;
    getEntityById(id: number): Observable<any>;
    saveUpdatedEntity(id: number, data: any): Observable<any>;
    saveEntity(data: any): Observable<any>;
    deleteEntityById(id: number): Observable<any>;
}