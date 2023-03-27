import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface UserData {
  _id?: string,
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


  addUser(firstName: string, lastName: string, imageName: string, imageData: any, email: string, phone: number, age: number) {
    const url = 'http://localhost:3000/auth/adduser';
    const data = {
      firstName: firstName,
      lastName: lastName,
      // imageName: imageName,
      image: imageData,
      email: email,
      phone: phone,
      age: age
    };

    return this.http.post(url, data);
  }

  updateUser(id: string, firstName: string, lastName: string, imageName: string, imageData: any, email: string, phone: number, age: number) {
    const url = 'http://localhost:3000/auth/edit/' + id;
    const data = {
      firstName: firstName,
      lastName: lastName,
      // imageName: imageName,
      image: imageData,
      email: email,
      phone: phone,
      age: age
    };

    return this.http.patch(url, data);
  }

}
