import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Message, User, Space } from '../class/chat';
import { ChatService } from '../service/chat.service';
import { AuthenticationService } from '@app/service/authentication.service';
import { AppComponent } from '@app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public content = '';
  public messages: Message[] = [];
  public user: User;
  public space =  new Space();
  data = '';

  constructor(
    private auth: AuthenticationService,
    private app: ChatService,
    public element: ElementRef,
    private activatedRoute: ActivatedRoute,
    private appComponent: AppComponent) { }

  ngOnInit() {
    this.getMessages();
  }

  getMessages = () => {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id')) {
        this.space = this.appComponent.spaces.filter((space) => {
          return space.id === Number(params.get('id'));
        })[0];
      } else {
        this.space.title = 'All Spaces';
      }
      this.app.getAllMessages(Number(params.get('id'))).subscribe(
        data => {
          this.messages = data;
          this.splitByN();
        },
        error => {
          console.log(error);
        }
      );
    });
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
