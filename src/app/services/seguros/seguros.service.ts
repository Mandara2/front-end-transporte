import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seguro} from 'src/app/models/seguro/seguro.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en SprinC
export class SeguroService {

  constructor(private http:HttpClient) {}

  list(): Observable<Seguro[]> { //lista de teatros, observable es como una promesa
    return this.http.get<Seguro[]>(`${environment.url_ms_negocio}/seguros`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<Seguro> {
    return this.http.get<Seguro>(`${environment.url_ms_negocio}/seguros/${id}`);
  }
  create(seguro:Seguro): Observable<Seguro> {
    return this.http.post<Seguro>(`${environment.url_ms_negocio}/seguros`,seguro); //CentrosDistribucion es el body
  }
  update(seguro:Seguro): Observable<Seguro> {
    return this.http.put<Seguro>(`${environment.url_ms_negocio}/seguros/${seguro.id}`,seguro);
  }
  


  delete(id: number) {
    return this.http.delete<Seguro>(`${environment.url_ms_negocio}/seguros/${id}`);
  }
}
