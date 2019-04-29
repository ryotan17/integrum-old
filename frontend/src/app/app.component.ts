import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from '@app/service/authentication.service';
import { User, Space, Group } from '@app/class/chat';
import { ChatService } from '@app/service/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public spaces: Space[] = [];
  public group = new Group();

  currentUser: User;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private app: ChatService,
    private auth: AuthenticationService
  ) {
    this.initializeApp();
  }

  getSpaces = () => {
    const user_id = this.auth.user.id;
    this.app.getAllSpaces(user_id).subscribe(
      data => {
        this.spaces = data;
        this.group = this.spaces[0].group;
      },
      error => {
        console.log(error);
      }
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.auth.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['messages']);
          this.getSpaces();
        } else {
          this.router.navigate(['login']);
          this.group.name = '';
        }
      });

    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
