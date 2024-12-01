import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrador} from 'src/app/models/administrador/administrador.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en Spring
export class AdministradorService {

  constructor(private http:HttpClient) {}

  list(): Observable<Administrador[]> { //lista de teatros, observable es como una promesa
    return this.http.get<Administrador[]>(`${environment.url_ms_negocio}/Administrador`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<Administrador> {
    return this.http.get<Administrador>(`${environment.url_ms_negocio}/Administrador/${id}`);
  }
  create(administrador:Administrador): Observable<Administrador> {
    return this.http.post<Administrador>(`${environment.url_ms_negocio}/Administrador`,administrador); //Administrador es el body
  }
  update(administrador:Administrador): Observable<Administrador> {
    return this.http.put<Administrador>(`${environment.url_ms_negocio}/Administrador/${administrador.id}`,administrador);
  }
  


  delete(id: number) {
    return this.http.delete<Administrador>(`${environment.url_ms_negocio}/Administrador/${id}`);
  }
}