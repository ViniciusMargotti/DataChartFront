import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraficoService {
  private urlBaseApi: string = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) {
  }



  saveGrafico(grafico) {
    const user = sessionStorage.getItem('tokenAuth');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + user);
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post(this.urlBaseApi + '/graficos/save', grafico, {headers});
  }

  getGraficos(): Observable<Grafico[]> {
    const idUsuario = sessionStorage.getItem('UserId');
    const user = sessionStorage.getItem('tokenAuth');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + user);
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.get<Grafico[]>(this.urlBaseApi + '/graficos/getAll/' + idUsuario, {headers});
  }
}
