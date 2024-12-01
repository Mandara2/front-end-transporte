import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conductor} from 'src/app/models/conductor/conductor.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en Spring
export class ConductorService {

  constructor(private http:HttpClient) {}

  list(): Observable<Conductor[]> { //lista de teatros, observable es como una promesa
    return this.http.get<Conductor[]>(`${environment.url_ms_negocio}/conductores`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<Conductor> {
    return this.http.get<Conductor>(`${environment.url_ms_negocio}/conductores/${id}`);
  }
  create(conductor:Conductor): Observable<Conductor> {
    return this.http.post<Conductor>(`${environment.url_ms_negocio}/conductores`,conductor); //CentrosDistribucion es el body
  }
  update(conductor:Conductor): Observable<Conductor> {
    return this.http.put<Conductor>(`${environment.url_ms_negocio}/conductores/${conductor.id}`,conductor);
  }
  


  delete(id: number) {
    return this.http.delete<Conductor>(`${environment.url_ms_negocio}/conductores/${id}`);
  }
}
