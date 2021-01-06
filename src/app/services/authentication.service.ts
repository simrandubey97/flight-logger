import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public api: 'http://localhost:300';

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
  }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'token': sessionStorage.getItem('auth')
    }),
    withCredentials: true
  }  
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>('http://localhost:3100/api/auth/login', { email, password })
      .pipe(map(user => {
        if (user && user.isAuth) {
          sessionStorage.setItem('currentUser', JSON.stringify(user.user));
          sessionStorage.setItem('token', user.user.token);
          // localStorage.setItem('currentUser', JSON.stringify(user.user));
          this.currentUserSubject.next(user.user);
        }
        return user.user;
      }));
  }
  logout() {
    return this.http.get('http://localhost:3100/api/auth/logout')
    .pipe(map(status => {
      if (status) {
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('token');
        // localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
      }
      return status;
    }))
    .subscribe()
    
  }
  forgetPassword(email: string){
    return this.http.post('http://localhost:3100/api/auth/forgetPassword', { email }).toPromise()
  }
  resetPassword(password: string, token: string){
    return this.http.post('http://localhost:3100/api/auth/reset/'+token, { password }).toPromise()
  }
}
