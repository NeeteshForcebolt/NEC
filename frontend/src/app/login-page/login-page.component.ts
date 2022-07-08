import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(public userLoginService: UserService, public router: Router) { }
  nameValue: any;
  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log('working')
    this.userLoginService.postUser1(form.value)
      .subscribe(
        res => {
          var userPayload1: any = res;
          console.log('Login Successfully', userPayload1.token);
          console.log('aa', this.userLoginService.getDecodedAccessToken(String(userPayload1.token)).fullName);
          this.nameValue = this.userLoginService.getDecodedAccessToken(String(userPayload1.token)).fullName;
          localStorage.setItem('token', userPayload1.token);
          this.router.navigateByUrl('/dashboard');
          this.resetForm(form)
        },
        err => {
          this.resetForm(form)
          console.error(err, err.status === 404)
          if (err.status === 404) {
            alert("User not exist")
            this.resetForm(form)
          }
          if (err.status === 401) {
            alert("Please Check Password")
            this.resetForm(form)
          }
        }

      )
  }
  resetForm(form: NgForm) {
    this.userLoginService.selectedUser =
    {
      fullName: '',
      email: '',
      password: ''
    };
    form.resetForm();
  }


}


