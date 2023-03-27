import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AddUserService } from './add-user.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';


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
    private http: HttpClient,
    public fb: FormBuilder
  ) { }


  user: any
  public imagePath: any;
  public imgURL: any;
  imgData: any
  public message: string = '';


  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = param['id'];
    });

    if (this.id) {
      const url = 'http://localhost:3000/auth/detail/' + this.id;
      this.http.get(url).subscribe(res => {
        this.user = res;
        this.addUser.form.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          phone: this.user.phone,
          age: this.user.age,
        })
        this.imgURL = this.user.image
        this.isAdd = false;
      })
    }
  }


  preview(files: any) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    let reader1 = new FileReader();
    let reader2 = new FileReader();
    this.imagePath = files;

    reader1.readAsDataURL(files[0]);
    reader1.onload = (_event) => {
      this.imgURL = reader1.result;
      // console.log(reader1.result)
    }
    reader2.readAsArrayBuffer(files[0]);
    reader2.onload = (_event) => {
      this.imgData = reader1.result;
      // console.log(reader2.result)
    }
  }

  onCancel() {
    this.router.navigate(['alluser'])
  }

  onSubmit(form: NgForm) {
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const phone = form.value.phone;
    const age = form.value.age;
    const imageName = form.value.imageName;
    const image = this.imgData;

    if (this.isAdd) {
      this.addUserService.addUser(firstName, lastName, imageName, image, email, phone, age).subscribe(res => { console.log(res) })
    }
    else {
      this.addUserService.updateUser(this.id, firstName, lastName, imageName, image, email, phone, age).pipe(
        catchError(error => {
          console.log(error)
          throw (error)
        })
      ).subscribe(res => {
        this.router.navigate(['alluser'])
      })
    }
    this.router.navigate(['alluser'])
  }
}
