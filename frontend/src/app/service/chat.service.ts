import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { WebSocketService } from './websocket.service';
import { Message, User, Space } from '@app/class/chat';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root', })
export class ChatService {

  baseurl = environment.url;
  HttpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  private messages: Subject<Message>;
  private chatUrl(spaceId: number, userId: number): string {
    return `ws://localhost:8000/chat/${spaceId}/?user_id=${userId}`;   // -- ① WebSocket サーバーの接続先です
  }

  constructor(private http: HttpClient, private ws: WebSocketService) {}

  // WebSocket
  connect(spaceId: number, userId: number): Subject<Message> { // -- ② チャットの接続。 WebSocketService の connect を呼び出し、 Subject を返します。
    this.ws.disconnect();
    return this.messages = <Subject<Message>>this.ws
      .connect(this.chatUrl(spaceId, userId))
      .pipe(
        map((response: MessageEvent): Message => {
          const data = JSON.parse(response.data) as Message;
          return data;
        })
      );
  }

  send(author: User, message: string): void { // -- ③ メッセージの送信要求をがあったときは、WebSocketService の `next` メソッドを呼んでいるだけです
    this.messages.next(this.sendMessage(author, message));
  }

  private sendMessage(author: User, message: string): Message {
    const _message = new Message();
    _message.author = author;
    _message.text = message;
    return _message;
  }

  // REST API
  getAllMessages(space_id, offset): Observable<any> {
    const options = { params: new HttpParams().set('space', space_id ? space_id : '').set('offset', offset).set('limit', '15'),
                      headers: this.HttpHeaders};
    return this.http.get(this.baseurl + '/chat/api/message/', options);
  }
  getMessage(id): Observable<any> {
    return this.http.get(this.baseurl + '/chat/api/message/' + id + '/', {headers: this.HttpHeaders});
  }
  updateMessage(message): Observable<any> {
    const body = {name: message.text};
    return this.http.put(this.baseurl + '/chat/api/message/' + message.id + '/', body, {headers: this.HttpHeaders});
  }
  createMessage(message): Observable<any> {
    const body = {name: message.text};
    return this.http.post(this.baseurl + '/chat/api/message/', body, {headers: this.HttpHeaders});
  }
  deleteMessage(id): Observable<any> {
    return this.http.delete(this.baseurl + '/chat/api/message/' + id + '/', {headers: this.HttpHeaders});
  }


  getAllSpaces(user_id): Observable<any> {
    const options = user_id ?
      { params: new HttpParams().set('user_id', user_id), headers: this.HttpHeaders} : {headers: this.HttpHeaders};
    return this.http.get(this.baseurl + '/chat/api/space/', options);
  }
  getSpace(id): Observable<any> {
    return this.http.get(this.baseurl + '/chat/api/space/' + id + '/', {headers: this.HttpHeaders});
  }
  updateSpace(space): Observable<any> {
    const body = {title: space.title};
    return this.http.put(this.baseurl + '/chat/api/space/' + space.id + '/', body, {headers: this.HttpHeaders});
  }
  createSpace(space): Observable<any> {
    const body = {title: space.title};
    return this.http.post(this.baseurl + '/chat/api/message/', body, {headers: this.HttpHeaders});
  }
  deleteSpace(id): Observable<any> {
    return this.http.delete(this.baseurl + '/chat/api/message/' + id + '/', {headers: this.HttpHeaders});
  }

}

