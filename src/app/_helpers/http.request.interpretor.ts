import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/**
 * Class takes credentials and Header, that prevents default Basic Auth popup from 
 * showing up, and injects them into all HttpRequests.
 */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      
      req = req.clone({
        withCredentials: true,
        headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
      });
      
      return next.handle(req);
  }
}