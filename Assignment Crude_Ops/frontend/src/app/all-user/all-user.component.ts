import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AuthenticationService, LoggedInData } from '../authentication/authentication.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';



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

  private users: any = []
  dataSource: any
  displayedColumns: string[] = []

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  @ViewChild(MatSort) sort = MatSort;
  @ViewChild(MatPaginator) paginator = MatPaginator;

  ngOnInit(): void {
    this.getUsers();
    this.authService.userActive.subscribe(res => {
      if (res) {
        this.displayedColumns = ['firstName', 'lastName', 'age', 'phone', 'email', 'update', 'delete'];
      }
      else {
        this.displayedColumns = ['firstName', 'lastName', 'age', 'phone', 'email'];
      }
    })
  }

  getUsers() {
    this.http.get('http://localhost:3000/auth/allusers').subscribe(res => {
      this.users = res;
      // this.dataSource = this.users;
      this.dataSource = new MatTableDataSource(this.users)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }





}
