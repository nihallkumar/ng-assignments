import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AddUserService } from './add-user.service';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  isAdd = true;
  id = '';

  @ViewChild('addUserForm', { static: true }) addUser!: NgForm

  constructor(
    private addUserService: AddUserService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      console.log(param['id'])
      this.id = param['id'];
    });

    if (this.id) {
      const url = 'http://localhost:3000/auth/detail/' + this.id;
      this.http.get(url).subscribe(res => {
        console.log(res);
        this.addUser.form.patchValue(res)
        this.isAdd = false;
      })
    }
  }

  onCancel(){
    this.router.navigate(['alluser'])
  }

  onSubmit(form: NgForm) {
    console.log(form.value);

    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const phone = form.value.phone;
    const age = form.value.age;

    if (this.isAdd) {
      this.addUserService.addUser(firstName, lastName, email, phone, age).subscribe(res => { console.log(res) })
    }
    else {
      this.addUserService.updateUser(this.id, firstName, lastName, email, phone, age).pipe(
        catchError(error => {
          console.log(error)
          throw (error)
        })
      ).subscribe(res => {
        console.log(res);
        this.router.navigate(['alluser'])
      })
    }
    this.router.navigate(['alluser'])
  }


}
