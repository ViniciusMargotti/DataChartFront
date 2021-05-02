import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private urlBaseApi: string = environment.baseUrl;

  constructor( private httpClient: HttpClient ) {}

  authenticate(username, password) {

    interface Jtw {
      token: string;
    }

    const request = {username, password};

    return this.httpClient.post<Jtw>(this.urlBaseApi + '/authenticate', request);
  }

  saveUsuario(usuario) {
    return this.httpClient.post(this.urlBaseApi + '/usuarios/save', usuario);
  }


  isUserLoggedIn() {
    const user = sessionStorage.getItem('tokenAuth');
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('tokenAuth');
  }

  saveToken(token) {
    sessionStorage.setItem('tokenAuth', token);
  }


}
