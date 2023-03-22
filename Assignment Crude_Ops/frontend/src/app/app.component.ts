import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Crud-Ops';

  constructor(private authServices: AuthenticationService) {
    if (localStorage.getItem('token')) {
      console.log('inside app cons')
      this.authServices.verify();
    }
    else {
      this.authServices.userActive.next(false);
    }
  }


}
