import { Injectable } from '@angular/core';
import { ApiPaths } from '../_constants/api.paths';
import { HttpClient } from '@angular/common/http';
import { GenericApiService } from '../_services/generic.api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericApiService {
  
  constructor(http: HttpClient){
    super(http, ApiPaths.USERS_PATH);
  }
}
