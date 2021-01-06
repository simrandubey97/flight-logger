import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError, from } from 'rxjs';

const TOKEN_KEY = 'token';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return from(this.handle(req, next));
    }

    async handle(request: HttpRequest<any>, next: HttpHandler) {
        let token = sessionStorage.getItem('token')

        if (token) {
            request = request.clone({ headers: request.headers.set('token', token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }
        return next.handle(request).toPromise()

    }
}
