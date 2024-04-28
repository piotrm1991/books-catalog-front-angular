import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths } from '../_constants/api.paths';
import { GenericApiService } from '../_services/generic.api.service';

/**
 * Service that holds logic for Shelf requests.
 * Extends GenericApiService.
 */
@Injectable({
  providedIn: 'root'
})
export class ShelfService extends GenericApiService {
  
  constructor(http: HttpClient){
    super(http, ApiPaths.SHELVES_PATH);
  }
}
