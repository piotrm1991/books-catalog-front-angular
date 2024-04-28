import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiPaths } from '../_constants/api.paths';
import { GenericApiService } from '../_services/generic.api.service';

/**
 * Service that holds logic for Author requests.
 * Extends GenericApiService.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthorService extends GenericApiService {
  
  constructor(http: HttpClient){
    super(http, ApiPaths.AUTHORS_PATH);
  }
}
