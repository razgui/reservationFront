import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from './loader.service';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private loaderService : LoaderService, private authService : AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.setLoadingState(true)
    // Get auth token
    const token = this.authService.getToken();
    let authReq ;
    //Clone the request and add the Authorization header with the token
    if(token != null){
       authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }else{
       authReq = req.clone({
      });
    }
    

    // Pass the cloned request instead of the original request to the next handler
    return next.handle(authReq.clone()).pipe(
      finalize(()=> this.loaderService.setLoadingState(true))
    );
  }
}
