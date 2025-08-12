import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CredencialModel } from '../model/credencial.model';

@Injectable({
  providedIn: 'root'
})
export class CredencialService {

  private readonly URL = "http://192.168.15.18:3000/defensium/credencial";

  private httpClient = inject(HttpClient);

  constructor() { }

  public cadastrarCredencial(credencialModel: CredencialModel) : Observable<CredencialModel> {
    console.log(credencialModel);
    return this.httpClient.post<CredencialModel>(this.URL, credencialModel);
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
