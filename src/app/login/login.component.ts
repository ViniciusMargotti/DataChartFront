import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MatSnackBar} from '@angular/material';
import {BairroService} from "../service/bairro.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, ErrorStateMatcher  {

  constructor(private router: Router,
              private loginservice: AuthenticationService,
              private bairroservice: BairroService,
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
    this.snackBar.open('Seja Bem vindo! O servidor deste projeto está hospedado em: ' +
      'loginseed.herokuapp.com , pode ser que demore alguns minutos após a primeira requisição' +
      ' para que o servidor seja iniciado.', 'Ok', {
      duration: 9000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });

    this.bairroservice.getAll(1);
  }

  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        this.loginservice.saveToken(data.token);
        this.router.navigate(['']);
        this.invalidLogin = false;
        this.snackBar.open('Seja Bem vindo!', 'Ok', {
          duration: 9000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
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
