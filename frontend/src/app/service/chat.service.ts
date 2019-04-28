import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root', })
export class ChatService {

  baseurl = environment.url;
  HttpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) {}

  getAllMessages(space_id): Observable<any> {
    const options = space_id ?
      { params: new HttpParams().set('space', space_id), headers: this.HttpHeaders} : {headers: this.HttpHeaders};
    return this.http.get(this.baseurl + '/api/chat/message/', options);
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


  getAllSpaces(user_id): Observable<any> {
    const options = user_id ?
      { params: new HttpParams().set('user_id', user_id), headers: this.HttpHeaders} : {headers: this.HttpHeaders};
    return this.http.get(this.baseurl + '/api/chat/space/', options);
  }
  getSpace(id): Observable<any> {
    return this.http.get(this.baseurl + '/api/chat/space/' + id + '/', {headers: this.HttpHeaders});
  }
  updateSpace(space): Observable<any> {
    const body = {title: space.title};
    return this.http.put(this.baseurl + '/api/chat/space/' + space.id + '/', body, {headers: this.HttpHeaders});
  }
  createSpace(space): Observable<any> {
    const body = {title: space.title};
    return this.http.post(this.baseurl + '/api/chat/message/', body, {headers: this.HttpHeaders});
  }
  deleteSpace(id): Observable<any> {
    return this.http.delete(this.baseurl + '/api/chat/message/' + id + '/', {headers: this.HttpHeaders});
  }

}

