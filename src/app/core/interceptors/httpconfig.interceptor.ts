import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class HttpconfigInterceptor implements HttpInterceptor {

  constructor(private _router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = localStorage.getItem('token');
    if (authToken) {
      request = request.clone({
        setHeaders: {
          token: authToken
        }
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if(event instanceof HttpResponse){
        }
        return event;
      }), catchError((error:HttpErrorResponse) => {

        switch(error.status){
          case 0: {
            Swal.fire({
              title: 'Error',
              text: error.message,
              icon: 'error',
              showCloseButton: true
            })
            break;
          }
          case 401: {
            Swal.fire({
              title: 'Session expired',
              icon: 'warning',
              showCloseButton: true
            }).then(response => {
              if(response.value){
                this._router.navigate(['/login']);
              }
            })
            break;
          }
          case 403: {
            Swal.fire({
              title: 'Forbidden',
              text: error.message,
              icon: 'error',
              showCloseButton: true
            }).then(response => {
              if(response.value){
                this._router.navigate(['/login']);
              }
            })
            break;
          }
          case 404: {
            Swal.fire({
              title: "Invalid page",
              text: "This page doesn't exist. Please, return home.",
              icon: 'error',
              showCloseButton: true,
            }).then(response => {
              if(response.value){
                this._router.navigate(['/home']);
              }
            })
            break;
          }
          default: {
            Swal.fire({
              title: 'Error',
              text: error.message,
              icon: 'error',
              showCloseButton: true
            })
            break;
          }
        }
        return throwError(error);
      })
    );
  }
}
