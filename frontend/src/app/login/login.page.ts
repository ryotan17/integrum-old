import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '@app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    this.auth.login(this.credentialsForm.value).subscribe();
  }
 
  register() {
    this.auth.register(this.credentialsForm.value).subscribe(res => {
      // Call Login to automatically login the new user
      this.auth.login(this.credentialsForm.value).subscribe();
    });
  }

}
