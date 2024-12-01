import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lote} from 'src/app/models/lote/lote.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en SprinC
export class LoteService {

  constructor(private http:HttpClient) {}

  list(): Observable<Lote[]> { //lista de teatros, observable es como una promesa
    return this.http.get<Lote[]>(`${environment.url_ms_negocio}/lotes`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<Lote> {
    return this.http.get<Lote>(`${environment.url_ms_negocio}/lotes/${id}`);
  }
  create(lote:Lote): Observable<Lote> {
    return this.http.post<Lote>(`${environment.url_ms_negocio}/lotes`,lote); //CentrosDistribucion es el body
  }
  update(lote:Lote): Observable<Lote> {
    return this.http.put<Lote>(`${environment.url_ms_negocio}/lotes/${lote.id}`,lote);
  }
  


  delete(id: number) {
    return this.http.delete<Lote>(`${environment.url_ms_negocio}/lotes/${id}`);
  }
}
