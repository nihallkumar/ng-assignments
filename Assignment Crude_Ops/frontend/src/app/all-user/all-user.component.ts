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
  public rows: any
  public page = '1';
  public limit: number = 5;
  public search: any = "";
  public sorts = { sort: 'firstName', order: 'asc' };
  public total: number = 0
  isActive = false;

  searchInput = new FormControl('');
  pageInput = new FormControl('');

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
      this.filteredUsers(this.page, this.limit, searchValue, this.sorts.sort, this.sorts.order)
    });

    this.getUsers();
  }

  onSelectLimit(selectedValue: string) {
    this.limit = parseInt(selectedValue);
    this.filteredUsers(this.page, this.limit, this.search, this.sorts.sort, this.sorts.order)
  }

  setPage(pageInfo: any) {
    this.filteredUsers(pageInfo.offset + 1, this.limit, this.search, this.sorts.sort, this.sorts.order)
  }

  filteredUsers(page: string, limit: number, search: any, sortsSort: string, sortsOrder: string) {
    this.allUserService.allUser(page, limit, search, sortsSort, sortsOrder).subscribe(res => {
      this.rows = (res as any).users;
      console.log(res)
    })
  }

  getUsers() {
    this.allUserService.allUser(this.page, this.limit, this.search, this.sorts.sort, this.sorts.order).subscribe(res => {
      this.rows = (res as any).users;
      this.total = (res as any).total;
    })
  }

  onDelete(user: UserData) {
    if (confirm("Sure?")) {
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
      return console.log('No')
    }
  }

  onEdit(user: UserData) {
    this.router.navigate([`adduser/${user._id}`])
  }
}
