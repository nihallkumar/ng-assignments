import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  active = true;

  constructor(private authService: AuthenticationService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.authService.userActive.subscribe(res => {
      console.log("inside header")
      console.log(res);
      this.active = res
    })
  }

  onLogout() {
    console.log("inside logout");
    localStorage.removeItem('token');
    this.authService.userActive.next(false);
    this.router.navigate(['auth'])
  }



}
