import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto} from 'src/app/models/producto/producto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en SprinC
export class ProductoService {

  constructor(private http:HttpClient) {}

  list(): Observable<Producto[]> { //lista de teatros, observable es como una promesa
    return this.http.get<Producto[]>(`${environment.url_ms_negocio}/productos`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<Producto> {
    return this.http.get<Producto>(`${environment.url_ms_negocio}/productos/${id}`);
  }
  create(producto:Producto): Observable<Producto> {
    return this.http.post<Producto>(`${environment.url_ms_negocio}/productos`,producto); //CentrosDistribucion es el body
  }
  update(producto:Producto): Observable<Producto> {
    return this.http.put<Producto>(`${environment.url_ms_negocio}/productos/${producto.id}`,producto);
  }
  


  delete(id: number) {
    return this.http.delete<Producto>(`${environment.url_ms_negocio}/productos/${id}`);
  }
}
