import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private urlBaseApi: string = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) {
  }

  getUsuarios(): Observable<any> {
    const user = sessionStorage.getItem('tokenAuth');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + user);
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.httpClient.get<Usuario[]>(this.urlBaseApi + '/usuarios/getAll', {headers});
  }
}
