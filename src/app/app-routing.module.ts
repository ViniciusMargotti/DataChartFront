import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroUsuariosComponent } from './cadastroUsuarios/cadastroUsuarios.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  { path: '', component: CadastroUsuariosComponent, canActivate: [AuthGaurdService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
