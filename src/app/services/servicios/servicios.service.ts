import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio} from 'src/app/models/servicio/servicio.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en SprinC
export class ServicioService {

  constructor(private http:HttpClient) {}

  list(): Observable<Servicio[]> { //lista de teatros, observable es como una promesa
    return this.http.get<Servicio[]>(`${environment.url_ms_negocio}/servicios`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<Servicio> {
    return this.http.get<Servicio>(`${environment.url_ms_negocio}/servicios/${id}`);
  }
  create(servicio:Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(`${environment.url_ms_negocio}/servicios`,servicio); //CentrosDistribucion es el body
  }
  update(servicio:Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(`${environment.url_ms_negocio}/servicios/${servicio.id}`,servicio);
  }
  


  delete(id: number) {
    return this.http.delete<Servicio>(`${environment.url_ms_negocio}/servicios/${id}`);
  }
}
