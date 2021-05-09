import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, ErrorStateMatcher  {

  constructor(private router: Router,
              private loginservice: AuthenticationService,
              private snackBar: MatSnackBar) { }
  get emailInput() { return this.signin.get('email'); }
  get passwordInput() { return this.signin.get('password'); }

  username = '';
  password = '';
  invalidLogin = false;

  signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ])
  });
  hide = true;

  ngOnInit() {
    const user = sessionStorage.getItem('tokenAuth');
    if (user !== null) {
      this.router.navigate(['']);
    }
  }

  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        this.loginservice.saveToken(data.token);
        this.loginservice.saveUserId(data.UserId);
        this.router.navigate(['']);
        this.invalidLogin = false;
      },
        response => {
        this.snackBar.open(response.error.message, 'Ok', {
          duration: 2500,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.invalidLogin = true;
      }
    )
    );

  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
