import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '@app/service/authentication.service';
import { ModalController } from '@ionic/angular';
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
    public modalController: ModalController) { }

  ngOnInit() {
    this.user = this.auth.user;
  }

  logout() {
    this.popover.dismiss();
    this.auth.logout();
  }

  async presentAccountModal() {
    const modal = await this.modalController.create({
      component: AccountComponent,
      componentProps: self
    });
    this.popover.dismiss();
    return await modal.present();
  }

}
