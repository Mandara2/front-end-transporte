import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CentroDistribucion} from 'src/app/models/centroDistribucion/centro-distribucion.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en Spring
export class CentrosDistribucionService {

  constructor(private http:HttpClient) {}

  list(): Observable<CentroDistribucion[]> { //lista de teatros, observable es como una promesa
    return this.http.get<CentroDistribucion[]>(`${environment.url_ms_negocio}/CentrosDistribucion`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<CentroDistribucion> {
    return this.http.get<CentroDistribucion>(`${environment.url_ms_negocio}/CentrosDistribucion/${id}`);
  }
  create(centroDistribucion:CentroDistribucion): Observable<CentroDistribucion> {
    return this.http.post<CentroDistribucion>(`${environment.url_ms_negocio}/CentrosDistribucion`,centroDistribucion); //CentrosDistribucion es el body
  }
  update(centroDistribucion:CentroDistribucion): Observable<CentroDistribucion> {
    return this.http.put<CentroDistribucion>(`${environment.url_ms_negocio}/CentrosDistribucion/${centroDistribucion.id}`,centroDistribucion);
  }
  


  delete(id: number) {
    return this.http.delete<CentroDistribucion>(`${environment.url_ms_negocio}/CentrosDistribucion/${id}`);
  }
}
