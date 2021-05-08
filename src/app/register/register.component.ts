import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(private router: Router,
              private loginservice: AuthenticationService,
              private snackBar: MatSnackBar) {
  }

  get emailInput() {
    return this.signin.get('email');
  }

  get passwordInput() {
    return this.signin.get('password');
  }

  get nomeInput() {
    return this.signin.get('nome');
  }

  get sobrenomeInput() {
    return this.signin.get('sobrenome');
  }

  email = '';
  password = '';
  nome = '';
  sobrenome = '';

  signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required, Validators.max(100)]),
    password: new FormControl('', [Validators.required, Validators.min(3)]),
    nome: new FormControl('', [Validators.required, Validators.max(100)]),
    sobrenome: new FormControl('', [Validators.required])
  });

  hide = true;

  ngOnInit() {
  }

  saveUsuario() {

    const pessoa: Pessoa = {
      nome: this.nome,
      sobrenome: this.sobrenome,
      id: null
    };

    const usuario: Usuario = {
      id: null,
      email: this.email,
      senha: this.password,
      pessoa
    };

    this.loginservice.saveUsuario(usuario).subscribe(
      data => {
        this.snackBar.open('Usuário cadastrado com sucesso!', 'Ok', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.router.navigate(['/login']);
      },
      response => {
        if (response.error.errors !== null) {
          this.snackBar.open(response.error.errors[0].message, 'Ok', {
            duration: 2500,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        } else {
          this.snackBar.open(response.error.message, 'Ok', {
            duration: 2500,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      }
    );
  }
}
