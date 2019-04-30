import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {

  baseurl = environment.url;
  HttpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get(this.baseurl + '/api/account/user/', {headers: this.HttpHeaders});
  }
  getUser(id): Observable<any> {
    return this.http.get(this.baseurl + '/api/account/user/' + id + '/', {headers: this.HttpHeaders});
  }

}

