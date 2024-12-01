import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gasto} from 'src/app/models/gasto/gasto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en SprinC
export class GastoService {

  constructor(private http:HttpClient) {}

  list(): Observable<Gasto[]> { //lista de teatros, observable es como una promesa
    return this.http.get<Gasto[]>(`${environment.url_ms_negocio}/gastos`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<Gasto> {
    return this.http.get<Gasto>(`${environment.url_ms_negocio}/gastos/${id}`);
  }
  create(gasto:Gasto): Observable<Gasto> {
    return this.http.post<Gasto>(`${environment.url_ms_negocio}/gastos`,gasto); //CentrosDistribucion es el body
  }
  update(gasto:Gasto): Observable<Gasto> {
    return this.http.put<Gasto>(`${environment.url_ms_negocio}/gastos/${gasto.id}`,gasto);
  }
  


  delete(id: number) {
    return this.http.delete<Gasto>(`${environment.url_ms_negocio}/gastos/${id}`);
  }
}
