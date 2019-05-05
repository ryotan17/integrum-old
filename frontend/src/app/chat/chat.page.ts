import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IonInfiniteScroll, IonContent, PopoverController } from '@ionic/angular';

import { Message, Space } from '../class/chat';
import { ChatService } from '../service/chat.service';
import { AuthenticationService } from '@app/service/authentication.service';
import { AppComponent } from '@app/app.component';
import { AccountMenuComponent } from '@app/account-menu/account-menu.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;

  public messages: Message[] = [];
  public space =  new Space();
  data = '';
  private nextUrl: URL;

  constructor(
    private auth: AuthenticationService,
    private app: ChatService,
    public element: ElementRef,
    private activatedRoute: ActivatedRoute,
    private appComponent: AppComponent,
    public popoverController: PopoverController) { }

  loadData() {
    setTimeout(() => {
      if (!this.nextUrl) {
        return;
      }
      const offset = this.nextUrl.searchParams.get('offset');
      this.getMessages(this.space.id, offset);
    }, 500);
  }

  send(message: string): void {
    this.app.send(
      this.auth.user, message
    );
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.getMessages(params.get('id'), '0');
      this.space = this.getSpace(params);
      this.app.connect(Number(params.get('id')), this.auth.user.user_id).subscribe(msg => {
        msg.texts = msg.text.split(/\r?\n/g);
        msg.author.photo = environment.url + msg.author.photo;
        this.messages.push(msg);
      });
    });
  }

  onScroll() {
    this.content.getScrollElement().then(res => {
      if (res.scrollTop < 500) {
        this.loadData();
      }
    });
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 100);
  }

  getMessages = (spaceId, offset) => {
    this.app.getAllMessages(spaceId, offset).subscribe(
      data => {
        if (!this.messages.length) {
          this.messages = data['results'].reverse();
        } else {
          this.messages = data['results'].reverse().concat(this.messages);
        }
        this.nextUrl = data['next'] ? new URL(data['next']) : null;
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

  async accountMenuPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: AccountMenuComponent,
      event: ev,
      translucent: true,
      cssClass: 'account-menu-popover',
      componentProps: self
    });
    return await popover.present();
  }

}
