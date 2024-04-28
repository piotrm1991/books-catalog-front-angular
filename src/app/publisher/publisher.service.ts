import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiPaths } from '../_constants/api.paths';
import { GenericApiService } from '../_services/generic.api.service';

/**
 * Service that holds logic for Publisher requests.
 * Extends GenericApiService.
 */
@Injectable({
  providedIn: 'root'
})
export class PublisherService extends GenericApiService {
  
  constructor(http: HttpClient){
    super(http, ApiPaths.PUBLISHERS_PATH);
  }
}
