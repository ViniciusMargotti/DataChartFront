import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EstadoService {
  private urlBaseApi: string = environment.baseUrl;
  constructor( private httpClient: HttpClient ) {}

  getAll() {
    return this.httpClient.get<Estado[]>(this.urlBaseApi + '/estados');
  }
}
