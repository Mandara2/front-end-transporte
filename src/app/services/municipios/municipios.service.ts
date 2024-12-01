import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Municipio} from 'src/app/models/municipio/municipio.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en SprinC
export class MunicipioService {

  constructor(private http:HttpClient) {}

  list(): Observable<Municipio[]> { //lista de teatros, observable es como una promesa
    return this.http.get<Municipio[]>(`${environment.url_ms_negocio}/municipios`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<Municipio> {
    return this.http.get<Municipio>(`${environment.url_ms_negocio}/municipios/${id}`);
  }
  create(municipio:Municipio): Observable<Municipio> {
    return this.http.post<Municipio>(`${environment.url_ms_negocio}/municipios`,municipio); //CentrosDistribucion es el body
  }
  update(municipio:Municipio): Observable<Municipio> {
    return this.http.put<Municipio>(`${environment.url_ms_negocio}/municipios/${municipio.id}`,municipio);
  }
  


  delete(id: number) {
    return this.http.delete<Municipio>(`${environment.url_ms_negocio}/municipios/${id}`);
  }
}
