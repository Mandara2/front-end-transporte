import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonaNatural} from 'src/app/models/personaNatural/persona-natural.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en SprinC
export class PersonaNaturalService {

  constructor(private http:HttpClient) {}

  list(): Observable<PersonaNatural[]> { //lista de teatros, observable es como una promesa
    return this.http.get<PersonaNatural[]>(`${environment.url_ms_negocio}/personasNaturales`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<PersonaNatural> {
    return this.http.get<PersonaNatural>(`${environment.url_ms_negocio}/personasNaturales/${id}`);
  }
  create(personaNatural:PersonaNatural): Observable<PersonaNatural> {
    return this.http.post<PersonaNatural>(`${environment.url_ms_negocio}/personasNaturales`,personaNatural); //CentrosDistribucion es el body
  }
  update(personaNatural:PersonaNatural): Observable<PersonaNatural> {
    return this.http.put<PersonaNatural>(`${environment.url_ms_negocio}/personasNaturales/${personaNatural.id}`,personaNatural);
  }
  


  delete(id: number) {
    return this.http.delete<PersonaNatural>(`${environment.url_ms_negocio}/personasNaturales/${id}`);
  }
}
