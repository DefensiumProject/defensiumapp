import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { PlataformaModel } from '../model/plataforma.model';

@Injectable({
  providedIn: 'root'
})
export class PlataformaService {

  private readonly URL = environment.url.concat("/plataforma");

  private httpClient = inject(HttpClient);

  constructor() { }

  public getCredencialList() : Observable<PlataformaModel[]> {
    return this.httpClient.get<PlataformaModel[]>(this.URL);
  }

}
