import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Turno} from 'src/app/models/turno/turno.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en SprinC
export class TurnoService {

  constructor(private http:HttpClient) {}

  list(): Observable<Turno[]> { //lista de teatros, observable es como una promesa
    return this.http.get<Turno[]>(`${environment.url_ms_negocio}/turnos`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<Turno> {
    return this.http.get<Turno>(`${environment.url_ms_negocio}/turnos/${id}`);
  }
  create(turno:Turno): Observable<Turno> {
    return this.http.post<Turno>(`${environment.url_ms_negocio}/turnos`,turno); //CentrosDistribucion es el body
  }
  update(turno:Turno): Observable<Turno> {
    return this.http.put<Turno>(`${environment.url_ms_negocio}/turnos/${turno.id}`,turno);
  }
  


  delete(id: number) {
    return this.http.delete<Turno>(`${environment.url_ms_negocio}/turnos/${id}`);
  }
}
