import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '@app/service/authentication.service';

@Injectable({ providedIn: 'root', })
export class ChatService {

  baseurl = environment.url;
  HttpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  getAllMessages(): Observable<any> {
    return this.http.get(this.baseurl + '/api/chat/message/', {headers: this.HttpHeaders});
  }
  getMessage(id): Observable<any> {
    return this.http.get(this.baseurl + '/api/chat/message/' + id + '/', {headers: this.HttpHeaders});
  }
  updateMessage(message): Observable<any> {
    const body = {name: message.text};
    return this.http.put(this.baseurl + '/api/chat/message/' + message.id + '/', body, {headers: this.HttpHeaders});
  }
  createMessage(message): Observable<any> {
    const body = {name: message.text};
    return this.http.post(this.baseurl + '/api/chat/message/', body, {headers: this.HttpHeaders});
  }
  deleteMessage(id): Observable<any> {
    return this.http.delete(this.baseurl + '/api/chat/message/' + id + '/', {headers: this.HttpHeaders});
  }

}

