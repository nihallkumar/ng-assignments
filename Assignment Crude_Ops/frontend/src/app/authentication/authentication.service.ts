import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


export interface LoggedInData {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn = false;
  public userActive = new BehaviorSubject<boolean>(false);
  dataSource: any

  constructor(private router: Router, private http: HttpClient) { }



  login(email: string, password: string) {
    const url = 'http://localhost:3000/auth/login';
    const data = {
      email: email,
      password: password
    };
    return this.http.post<LoggedInData>(url, data).pipe(
      catchError(error => {
        alert(error.error.error)
        throw (error.error.error)
      })
    ).subscribe((res) => {
      this.userActive.next(true);
      this.userActive.subscribe(res => { console.log(res) })
      localStorage.setItem('token', res.token)
      this.router.navigate(['alluser'])
    });
  }


  signup(email: string, password: string) {
    const url = 'http://localhost:3000/auth/signup';
    const data = {
      email: email,
      password: password
    };
    return this.http.post<LoggedInData>(url, data).pipe(
      catchError(error => {
        alert(error.error.error)
        throw (error.error.error)
      })
    ).subscribe((res) => {
      this.userActive.next(true);
      this.userActive.subscribe(res => { console.log(res) })
      localStorage.setItem('token', res.token)
      this.router.navigate(['alluser'])
    });
  }



  verify() {
    const url = 'http://localhost:3000/auth/verify';
    const token = localStorage.getItem('token');
    const data = {
      token: token
    };
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post(url, data).pipe(
      catchError(error => {
        alert("Unauthorized")
        console.log(headers);
        console.log(data);
        localStorage.removeItem('token');
        this.router.navigate(['auth']);
        this.userActive.next(false);
        this.userActive.subscribe(res => { console.log(res) })
        throw (error)
      })
    ).subscribe((res) => {
      this.userActive.next(true);
      this.userActive.subscribe(res => { console.log(res) })
    });
  }

}
