import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BairroService {
  private urlBaseApi: string = environment.baseUrl;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getAll(cidadeSelecionada) {
    return this.httpClient.get<Bairro[]>(this.urlBaseApi + '/bairros/' + cidadeSelecionada);
  }
}
