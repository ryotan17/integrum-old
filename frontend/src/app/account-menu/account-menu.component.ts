import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/service/authentication.service';
import { User } from '@app/class/chat';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss'],
})
export class AccountMenuComponent implements OnInit {
  public user: User;

  constructor(
    private auth: AuthenticationService) { }

  ngOnInit() {
    this.user = this.auth.user;
  }

  logout() {
    this.auth.logout();
  }

}
