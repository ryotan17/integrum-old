import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from "rxjs";

import { Message, User, Session } from '../class/chat';
import { ChatService } from '../service/chat.service';
import { UserService } from '../service/user.service';

import { map } from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public content = '';
  public messages: Message[] = [];
  public user: User;

  constructor(
    private app: ChatService,
    private userService: UserService,
    public element: ElementRef) { }

  ngOnInit() {
    this.getMessages();
  }

  getMessages = () => {
    this.app.getAllMessages().subscribe(
      data => {
        this.messages = data;
        this.splitByN();
      },
      error => {
        console.log(error);
      }
    );
  }

  splitByN() {
    this.messages.forEach( message => {
      message.text = message.text.split(/\r?\n/g);
    });
  }

  textChange($event) {
    const textArea = $event.target.firstElementChild;
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

}
