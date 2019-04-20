import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

  baseurl = 'http://127.0.0.1:8000';
  HttpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get(this.baseurl + '/api/account/user/', {headers: this.HttpHeaders});
  }
  getUser(id): Observable<any> {
    return this.http.get(this.baseurl + '/api/account/user/' + id + '/', {headers: this.HttpHeaders});
  }

}

