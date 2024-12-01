import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehiculo} from 'src/app/models/vehiculo/vehiculo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en SprinC
export class VehiculoService {

  constructor(private http:HttpClient) {}

  list(): Observable<Vehiculo[]> { //lista de teatros, observable es como una promesa
    return this.http.get<Vehiculo[]>(`${environment.url_ms_negocio}/vehiculos`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`${environment.url_ms_negocio}/vehiculos/${id}`);
  }
  create(vehiculo:Vehiculo): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(`${environment.url_ms_negocio}/vehiculos`,vehiculo); //CentrosDistribucion es el body
  }
  update(vehiculo:Vehiculo): Observable<Vehiculo> {
    return this.http.put<Vehiculo>(`${environment.url_ms_negocio}/vehiculos/${vehiculo.id}`,vehiculo);
  }
  


  delete(id: number) {
    return this.http.delete<Vehiculo>(`${environment.url_ms_negocio}/vehiculos/${id}`);
  }
}
