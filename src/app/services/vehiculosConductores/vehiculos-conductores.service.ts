import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehiculoConductor} from 'src/app/models/vehiculoConductor/vehiculo-conductor.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en SprinC
export class VehiculoConductorService {

  constructor(private http:HttpClient) {}

  list(): Observable<VehiculoConductor[]> { //lista de teatros, observable es como una promesa
    return this.http.get<VehiculoConductor[]>(`${environment.url_ms_negocio}/vehiculoConductores`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<VehiculoConductor> {
    return this.http.get<VehiculoConductor>(`${environment.url_ms_negocio}/vehiculoConductores/${id}`);
  }
  create(vehiculoConductor:VehiculoConductor): Observable<VehiculoConductor> {
    return this.http.post<VehiculoConductor>(`${environment.url_ms_negocio}/vehiculoConductores`,vehiculoConductor); //CentrosDistribucion es el body
  }
  update(vehiculoConductor:VehiculoConductor): Observable<VehiculoConductor> {
    return this.http.put<VehiculoConductor>(`${environment.url_ms_negocio}/vehiculoConductores/${vehiculoConductor.id}`,vehiculoConductor);
  }
  


  delete(id: number) {
    return this.http.delete<VehiculoConductor>(`${environment.url_ms_negocio}/vehiculoConductores/${id}`);
  }
}
