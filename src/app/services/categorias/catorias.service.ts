import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria} from 'src/app/models/categoria/categoria.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en Spring
export class CategoriaService {

  constructor(private http:HttpClient) {}

  list(): Observable<Categoria[]> { //lista de teatros, observable es como una promesa
    return this.http.get<Categoria[]>(`${environment.url_ms_negocio}/categorias`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<Categoria> {
    return this.http.get<Categoria>(`${environment.url_ms_negocio}/categorias/${id}`);
  }
  create(categoria:Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${environment.url_ms_negocio}/categorias`,categoria); //categoria es el body
  }
  update(categoria:Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${environment.url_ms_negocio}/categorias/${categoria.id}`,categoria);
  }
  


  delete(id: number) {
    return this.http.delete<Categoria>(`${environment.url_ms_negocio}/categorias/${id}`);
  }
}
