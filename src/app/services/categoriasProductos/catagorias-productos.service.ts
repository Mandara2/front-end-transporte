import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaProducto} from 'src/app/models/categoriaProducto/categoria-producto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en Spring
export class CategoriaProductoService {

  constructor(private http:HttpClient) {}

  list(): Observable<CategoriaProducto[]> { //lista de teatros, observable es como una promesa
    return this.http.get<CategoriaProducto[]>(`${environment.url_ms_negocio}/categoriasProductos`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<CategoriaProducto> {                                            
    return this.http.get<CategoriaProducto>(`${environment.url_ms_negocio}/categoriasProductos/${id}`);
  }
  create(categoriaProducto:CategoriaProducto): Observable<CategoriaProducto> {
    return this.http.post<CategoriaProducto>(`${environment.url_ms_negocio}/categoriasProductos`,categoriaProducto); //CategoriaProducto es el body
  }
  update(categoriaProducto:CategoriaProducto): Observable<CategoriaProducto> {
    return this.http.put<CategoriaProducto>(`${environment.url_ms_negocio}/categoriasProductos/${categoriaProducto.id}`,categoriaProducto);
  }
  


  delete(id: number) {
    return this.http.delete<CategoriaProducto>(`${environment.url_ms_negocio}/categoriasProductos/${id}`);
  }
}
