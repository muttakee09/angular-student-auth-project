import { Injectable } from '@angular/core';
import {HttpEvent,  HttpInterceptor,  HttpHandler,  HttpRequest,
  HttpResponse,  HttpErrorResponse} from '@angular/common/http';
 import { Observable, throwError } from 'rxjs';
 import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
     .pipe(
       retry(1),
       catchError((error: HttpErrorResponse) => {
         let errorMessage = '';
         if (error.error instanceof ErrorEvent) {
           errorMessage = `Error: ${error.error.message}`;
         } else {
           errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
         }
         console.error(errorMessage);
         return throwError(errorMessage);
       })
     )
  }
}
