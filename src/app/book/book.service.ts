import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths } from '../_constants/api.paths';
import { GenericApiService } from '../_services/generic.api.service';

@Injectable({
  providedIn: 'root'
})
export class BookService extends GenericApiService {
  
  constructor(http: HttpClient){
    super(http, ApiPaths.BOOKS_PATH);
  }
}
