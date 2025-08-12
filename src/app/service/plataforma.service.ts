import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlataformaModel } from '../model/plataforma.model';

@Injectable({
  providedIn: 'root'
})
export class PlataformaService {

  private readonly URL = "http://192.168.15.18:3000/defensium/plataforma";

  private httpClient = inject(HttpClient);

  constructor() { }

  public getCredencialList() : Observable<PlataformaModel[]> {
    return this.httpClient.get<PlataformaModel[]>(this.URL);
  }

}
