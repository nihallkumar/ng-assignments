import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AllUserService {

  constructor(private http:HttpClient) { }

  getUser(){
    const url = 'http://localhost:3000/auth/allusers';

  }
}
