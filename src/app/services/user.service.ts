import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public apiURL: 'http://localhost:3100';

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post('http://localhost:3100/api/user/register', user);
  }
  getUserDetails(){
    return this.http.get('http://localhost:3100/api/user/profile').toPromise(); 
  }
  editUserDetails(user: User){
    return this.http.put('http://localhost:3100/api/user/editProfile', user).toPromise(); 
  }
  changePassword(user){
    return this.http.put('http://localhost:3100/api/user/changePassword', user).toPromise(); 
  }
  getUsers(){
    return this.http.get('http://localhost:3100/api/user/all');
  }
}
