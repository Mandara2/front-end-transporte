import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ruta} from 'src/app/models/ruta/ruta.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en SprinC
export class RutaService {

  constructor(private http:HttpClient) {}

  list(): Observable<Ruta[]> { //lista de teatros, observable es como una promesa
    return this.http.get<Ruta[]>(`${environment.url_ms_negocio}/rutas`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<Ruta> {
    return this.http.get<Ruta>(`${environment.url_ms_negocio}/rutas/${id}`);
  }
  create(ruta:Ruta): Observable<Ruta> {
    return this.http.post<Ruta>(`${environment.url_ms_negocio}/rutas`,ruta); //CentrosDistribucion es el body
  }
  update(ruta:Ruta): Observable<Ruta> {
    return this.http.put<Ruta>(`${environment.url_ms_negocio}/rutas/${ruta.id}`,ruta);
  }
  


  delete(id: number) {
    return this.http.delete<Ruta>(`${environment.url_ms_negocio}/rutas/${id}`);
  }
}
