import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Message, Space } from '../class/chat';
import { ChatService } from '../service/chat.service';
import { AuthenticationService } from '@app/service/authentication.service';
import { AppComponent } from '@app/app.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss'],
})
export class ChatPage implements OnInit {
  public content = '';
  public messages: Message[] = [];
  public space =  new Space();
  data = '';

  constructor(
    private auth: AuthenticationService,
    private app: ChatService,
    public element: ElementRef,
    private activatedRoute: ActivatedRoute,
    private appComponent: AppComponent) { }

  send(message: string): void {
    this.app.send(
      this.auth.user, message
    );
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.getMessages(params);
      this.space = this.getSpace(params);
      this.app.connect(Number(params.get('id')), this.auth.user.user_id).subscribe(msg => {
        msg.texts = msg.text.split(/\r?\n/g);
        msg.author.photo = environment.url + msg.author.photo;
        this.messages.push(msg);
      });
    });
  }

  getMessages = (params: ParamMap) => {
    this.app.getAllMessages(Number(params.get('id'))).subscribe(
      data => {
        this.messages = data;
        this.splitByN();
      },
      error => {
        console.log(error);
      }
    );
  }

  getSpace(params: ParamMap): Space {
    if (params.get('id')) {
      return this.appComponent.spaces.filter((space) => {
        return space.id === Number(params.get('id'));
      })[0];
    } else {
      const space = new Space();
      space.title = 'All Spaces';
      space.id = 1;
      return space;
    }
  }

  splitByN() {
    this.messages.forEach( message => {
      message.texts = message.text.split(/\r?\n/g);
    });
  }

  textChange($event) {
    const textArea = $event.target.firstElementChild;
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  logout() {
    this.auth.logout();
  }

}
