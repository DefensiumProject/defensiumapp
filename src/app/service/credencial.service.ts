import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CredencialCadastrarModel } from '../model/credencial-cadastrar.model';

@Injectable({
  providedIn: 'root'
})
export class CredencialService {

  private readonly URL = "http://192.168.15.18:3000/defensium/credencial";

  private httpClient = inject(HttpClient);

  constructor() { }

  public cadastrarCredencial(credencialCadastrarModel: CredencialCadastrarModel) : Observable<CredencialCadastrarModel> {
    console.log(credencialCadastrarModel);
    return this.httpClient.post<CredencialCadastrarModel>(this.URL, credencialCadastrarModel);
  }

  public recuperarCredencialList() : Observable<any> {
    return this.httpClient.get<any>(this.URL);
  }

  public recuperarCredencial(codigo: any) : Observable<any> {
    return this.httpClient.get<any>(this.URL.concat("/").concat(codigo));
  }

  public atualizarCredencial(credencialModel: any) : Observable<any> {
    debugger
    return this.httpClient.put<any>(this.URL.concat("/").concat(credencialModel.codigo), credencialModel);
  }

}
