import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

import { Message, User, Session } from '../class/chat';
import { ChatService } from '../service/chat.service';
import { UserService } from '../service/user.service';
import { AuthenticationService } from '@app/service/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public content = '';
  public messages: Message[] = [];
  public user: User;
  data = '';

  constructor(
    private auth: AuthenticationService,
    private storage: Storage,
    private toastController: ToastController,
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
      message.texts = message.text.split(/\r?\n/g);
    });
  }

  textChange($event) {
    const textArea = $event.target.firstElementChild;
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  loadSpecialInfo() {
    // this.auth.getSpecialData().subscribe(res => {
    //   this.data = res['msg'];
    // });
    this.storage.get('access_token').then(res => {
      this.data = res;
    });
  }

  logout() {
    this.auth.logout();
  }

  clearToken() {
    // ONLY FOR TESTING!
    this.storage.remove('access_token');

    const toast = this.toastController.create({
      message: 'JWT removed',
      duration: 3000
    });
    toast.then(res => res.present());
  }

}
