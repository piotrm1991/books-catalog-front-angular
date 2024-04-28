import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiPaths } from '../_constants/api.paths';
import { GenericApiService } from '../_services/generic.api.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends GenericApiService {
  
  constructor(http: HttpClient){
    super(http, ApiPaths.ROOMS_PATH);
  }
}
