import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Direccion} from 'src/app/models/direccion/direccion.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en SprinC
export class DireccionService {

  constructor(private http:HttpClient) {}

  list(): Observable<Direccion[]> { //lista de teatros, observable es como una promesa
    return this.http.get<Direccion[]>(`${environment.url_ms_negocio}/direcciones`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<Direccion> {
    return this.http.get<Direccion>(`${environment.url_ms_negocio}/direcciones/${id}`);
  }
  create(direccion:Direccion): Observable<Direccion> {
    return this.http.post<Direccion>(`${environment.url_ms_negocio}/direcciones`,direccion); //CentrosDistribucion es el body
  }
  update(direccion:Direccion): Observable<Direccion> {
    return this.http.put<Direccion>(`${environment.url_ms_negocio}/direcciones/${direccion.id}`,direccion);
  }
  


  delete(id: number) {
    return this.http.delete<Direccion>(`${environment.url_ms_negocio}/direcciones/${id}`);
  }
}
