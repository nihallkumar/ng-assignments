import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService, LoggedInData } from '../authentication/authentication.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AllUserService } from './all-user.service';

export interface UserData {
  _id: string,
  firstName: string,
  lastName: string,
  email: string;
  phone: number;
  age: number;
}

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {


  searchInput = new FormControl('');
  pageInput = new FormControl('');

  public rows: any
  public page = '1';
  public limit: number = 5;
  public search: any = "";
  public sorts = { sort: 'firstName', order: 'asc' };
  public total: number = 0
  isActive = false;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private allUserService: AllUserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.userActive.subscribe(res => {
      this.isActive = res;
    })

    this.searchInput.valueChanges.pipe(
      debounceTime(500)
    ).subscribe((searchValue) => {
      console.log("inside search")
      console.log(searchValue)
      this.allUserService.allUser(this.page, this.limit, searchValue, this.sorts.sort, this.sorts.order).subscribe(res => {
        this.rows = (res as any).users;
        console.log(res);
      })
    });

    this.getUsers();
  }

  onSelect(selectedValue: string) {
    this.limit = parseInt(selectedValue);
    this.allUserService.allUser(this.page, this.limit, this.search, this.sorts.sort, this.sorts.order).subscribe(res => {
      this.rows = (res as any).users;
      console.log(res)
    })
  }

  setPage(pageInfo: any) {
    console.log("pageInfo===>", pageInfo);
    this.allUserService.allUser(pageInfo.offset+1, this.limit, this.search, this.sorts.sort, this.sorts.order).subscribe(res => {
      this.rows = (res as any).users;
      console.log(res)
    })
  }

  getUsers() {
    console.log('page: ', this.page, ' limit: ', this.limit, ' sorts.sort: ', this.sorts.sort, ' sorts.order: ', this.sorts.order, ' search: ', this.search)
    this.allUserService.allUser(this.page, this.limit, this.search, this.sorts.sort, this.sorts.order).subscribe(res => {
      this.rows = (res as any).users;
      this.total = (res as any).total;
      console.log(this.total)
      console.log(res)
    })
  }

  onDelete(user: UserData) {
    if (confirm("Sure?")) {
      console.log('yess')
      const url = 'http://localhost:3000/auth/delete/' + user._id;
      return this.http.delete<LoggedInData>(url).pipe(
        catchError(error => {
          alert(error.error.error)
          throw (error.error.error)
        })
      ).subscribe((res) => {
        console.log(res);
        this.getUsers();
      });
    }
    else {
      return console.log('Noo')
    }
  }

  onEdit(user: UserData) {
    console.log("Edit");
    this.router.navigate([`adduser/${user._id}`])
  }
}
