import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '@app/service/user.service';
import { AuthenticationService } from '@app/service/authentication.service';
import { User, Group } from '../class/chat';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  @Input() private modal;
  profileForm: FormGroup;
  user: User;
  group: Group;

  constructor(
    private userService: UserService,
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      id: [this.auth.user.user_id, [Validators.required]],
      group: [this.group.id],
      email: [this.auth.user.email, [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      photo: [''],
    });
    this.userService.getUser(this.auth.user.user_id).subscribe(user => {
      this.user = user;
      this.profileForm.patchValue({
        username: this.user.username,
      });
    });
  }

  cancel() {
    this.modal.dismiss();
  }

  onSubmit() {
    console.log(this.profileForm.value);
    this.userService.updateUser(this.profileForm.value).subscribe();
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      console.log(reader.result);

      reader.onload = () => {
        this.profileForm.patchValue({
          photo: reader.result
       });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

}
