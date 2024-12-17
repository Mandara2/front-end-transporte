import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departamento} from 'src/app/models/departamento/departamento.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en SprinC
export class DepartamentoService {

  constructor(private http:HttpClient) {}

  list(): Observable<Departamento[]> { //lista de teatros, observable es como una promesa
    return this.http.get<Departamento[]>(`${environment.url_ms_negocio}/departamentos`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<Departamento> {
    return this.http.get<Departamento>(`${environment.url_ms_negocio}/departamentos/${id}`);
  }
  create(departamento:Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(`${environment.url_ms_negocio}/departamentos`,departamento); //CentrosDistribucion es el body
  }
  update(departamento:Departamento): Observable<Departamento> {
    return this.http.put<Departamento>(`${environment.url_ms_negocio}/departamentos/${departamento.id}`,departamento);
  }
  


  delete(id: number) {
    return this.http.delete<Departamento>(`${environment.url_ms_negocio}/departamentos/${id}`);
  }
}
