import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CredencialCadastrarModel } from '../model/credencial-cadastrar.model';

@Injectable({
  providedIn: 'root'
})
export class CredencialService {

  private readonly URL = "http://localhost:3000/defensium/credencial";

  private httpClient = inject(HttpClient);

  constructor() { }

  public cadastrarCredencial(credencialCadastrarModel: CredencialCadastrarModel) : Observable<CredencialCadastrarModel> {
    console.log(credencialCadastrarModel);
    return this.httpClient.post<CredencialCadastrarModel>(this.URL, credencialCadastrarModel);
  }

}
