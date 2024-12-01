import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DuenoVehiculo} from 'src/app/models/duenoVehiculo/dueno-vehiculo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en SprinC
export class DuenoVehiculoService {

  constructor(private http:HttpClient) {}

  list(): Observable<DuenoVehiculo[]> { //lista de teatros, observable es como una promesa
    return this.http.get<DuenoVehiculo[]>(`${environment.url_ms_negocio}/duenoVehiculos`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<DuenoVehiculo> {
    return this.http.get<DuenoVehiculo>(`${environment.url_ms_negocio}/duenoVehiculos/${id}`);
  }
  create(duenoVehiculo:DuenoVehiculo): Observable<DuenoVehiculo> {
    return this.http.post<DuenoVehiculo>(`${environment.url_ms_negocio}/duenoVehiculos`,duenoVehiculo); //CentrosDistribucion es el body
  }
  update(duenoVehiculo:DuenoVehiculo): Observable<DuenoVehiculo> {
    return this.http.put<DuenoVehiculo>(`${environment.url_ms_negocio}/duenoVehiculos/${duenoVehiculo.id}`,duenoVehiculo);
  }
  


  delete(id: number) {
    return this.http.delete<DuenoVehiculo>(`${environment.url_ms_negocio}/duenoVehiculos/${id}`);
  }
}
