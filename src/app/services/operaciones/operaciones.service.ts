import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operacion} from 'src/app/models/operacion/operacion.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en SprinC
export class OperacionService {

  constructor(private http:HttpClient) {}

  list(): Observable<Operacion[]> { //lista de teatros, observable es como una promesa
    return this.http.get<Operacion[]>(`${environment.url_ms_negocio}/operaciones`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<Operacion> {
    return this.http.get<Operacion>(`${environment.url_ms_negocio}/operaciones/${id}`);
  }
  create(operacion:Operacion): Observable<Operacion> {
    return this.http.post<Operacion>(`${environment.url_ms_negocio}/operaciones`,operacion); //CentrosDistribucion es el body
  }
  update(operacion:Operacion): Observable<Operacion> {
    return this.http.put<Operacion>(`${environment.url_ms_negocio}/operaciones/${operacion.id}`,operacion);
  }
  


  delete(id: number) {
    return this.http.delete<Operacion>(`${environment.url_ms_negocio}/operaciones/${id}`);
  }
}
