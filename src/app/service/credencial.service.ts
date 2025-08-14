import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CredencialModel } from '../model/credencial.model';

@Injectable({
  providedIn: 'root'
})
export class CredencialService {

  private readonly URL = environment.url.concat("/credencial");

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
