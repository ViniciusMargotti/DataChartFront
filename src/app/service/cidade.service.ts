import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CidadeService {
  private urlBaseApi: string = environment.baseUrl;
  constructor( private httpClient: HttpClient ) {}

  getAll(estadoSelecionado) {
    return this.httpClient.get<Cidade[]>(this.urlBaseApi + '/cidades/' + estadoSelecionado);
  }
}
