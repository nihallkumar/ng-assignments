import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface UserData {
  _id?:string,
  firstName: string,
  lastName: string,
  email: string,
  phone: number,
  age: number
}


@Injectable({
  providedIn: 'root'
})
export class AddUserService {


  constructor(private http: HttpClient) { }


  addUser(firstName: string, lastName: string, email: string, phone: number, age: number) {
    const url = 'http://localhost:3000/auth/adduser';
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      age: age
    };
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<UserData>(url, data);
  }

  updateUser(id:string, firstName: string, lastName: string, email: string, phone: number, age: number) {
    const url = 'http://localhost:3000/auth/edit/'+id;
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,   
      phone: phone,
      age: age
    };

    return this.http.patch<UserData>(url, data);
  }

}
