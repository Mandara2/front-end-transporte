import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DirListaOrden} from 'src/app/models/dirListaOrden/dir-lista-orden.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en SprinC
export class DirListaOrdenService {

  constructor(private http:HttpClient) {}

  list(): Observable<DirListaOrden[]> { //lista de teatros, observable es como una promesa
    return this.http.get<DirListaOrden[]>(`${environment.url_ms_negocio}/dirListaOrdenes`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<DirListaOrden> {
    return this.http.get<DirListaOrden>(`${environment.url_ms_negocio}/dirListaOrdenes/${id}`);
  }
  create(dirListaOrden:DirListaOrden): Observable<DirListaOrden> {
    return this.http.post<DirListaOrden>(`${environment.url_ms_negocio}/dirListaOrdenes`,dirListaOrden); //CentrosDistribucion es el body
  }
  update(dirListaOrden:DirListaOrden): Observable<DirListaOrden> {
    return this.http.put<DirListaOrden>(`${environment.url_ms_negocio}/dirListaOrdenes/${dirListaOrden.id}`,dirListaOrden);
  }
  


  delete(id: number) {
    return this.http.delete<DirListaOrden>(`${environment.url_ms_negocio}/dirListaOrdenes/${id}`);
  }
}
