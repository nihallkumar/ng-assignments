import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {

  loginMode = true;
  active = false;

  constructor( private authServices: AuthenticationService) { }

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    console.log(form.value)

    const email = form.value.email;
    const password = form.value.password;

    if (this.loginMode) {
      this.authServices.login(email, password)
    }
    else {
      if (form.value.password !== form.value.cpassword) {
        alert('Password Not Matched')
      } else {
        this.authServices.signup(email, password)
      }
    }

    form.reset()
  }

}
