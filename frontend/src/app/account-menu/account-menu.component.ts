import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '@app/service/authentication.service';
import { PopoverController } from '@ionic/angular';
import { User } from '@app/class/chat';
import { AccountComponent } from '@app/account/account.component';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss'],
})
export class AccountMenuComponent implements OnInit {
  @Input() private popover;
  public user: User;

  constructor(
    private auth: AuthenticationService,
    public popoverController: PopoverController) { }

  ngOnInit() {
    this.user = this.auth.user;
  }

  logout() {
    this.auth.logout();
  }

  async accountPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: AccountComponent,
      event: ev,
      translucent: true,
      cssClass: 'account-popover',
    });
    this.popover.dismiss();
    return await popover.present();
  }

}
