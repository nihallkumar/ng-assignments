import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AllUserService {

  constructor(private http: HttpClient) { }

  allUser(page: string, limit: number, search:any, sortsSort: string, SortsOrder: string) {
    const url = `http://localhost:3000/auth/allusers?page=${page}&sort=${sortsSort},${SortsOrder}&search=${search}&limit=${limit}`

    return this.http.get(url);
  }

}
