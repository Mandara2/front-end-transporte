import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurante} from 'src/app/models/restaurante/restaurante.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en SprinC
export class RestauranteService {

  constructor(private http:HttpClient) {}

  list(): Observable<Restaurante[]> { //lista de teatros, observable es como una promesa
    return this.http.get<Restaurante[]>(`${environment.url_ms_negocio}/restaurantes`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<Restaurante> {
    return this.http.get<Restaurante>(`${environment.url_ms_negocio}/restaurantes/${id}`);
  }
  create(restaurante:Restaurante): Observable<Restaurante> {
    return this.http.post<Restaurante>(`${environment.url_ms_negocio}/restaurantes`,restaurante); //CentrosDistribucion es el body
  }
  update(restaurante:Restaurante): Observable<Restaurante> {
    return this.http.put<Restaurante>(`${environment.url_ms_negocio}/restaurantes/${restaurante.id}`,restaurante);
  }
  


  delete(id: number) {
    return this.http.delete<Restaurante>(`${environment.url_ms_negocio}/restaurantes/${id}`);
  }
}
