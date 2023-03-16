import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm
  defaultQuestion = "pet"
  answer = ''
  genders = ['Male', 'Female']
  user = {
    username: '',
    email: '',
    SecretQuestion: '',
    answer: '',
    gender: ''
  }
  submitted=false


  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: 'suggestedName@gamil.com'
    //   },
    //   gender: 'Male',
    //   secret: 'pet',
    //   quesAnswer: "hello"
    // })

    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName,
        email: 'suggestedName@gamil.com'
      }
    })

  }

  // onSubmit(form: NgForm){
  //   console.log(form)
  // }

  onSubmit(form: NgForm) {
    // console.log(this.signupForm)
    this.submitted=true
    this.user.username=this.signupForm.value.userData.username;
    this.user.email=this.signupForm.value.userData.email;
    this.user.SecretQuestion=this.signupForm.value.secret;
    this.user.answer=this.signupForm.value.quesAnswer;
    this.user.gender=this.signupForm.value.gender;

    console.log(this.user);
    this.signupForm.reset();
  }
}
