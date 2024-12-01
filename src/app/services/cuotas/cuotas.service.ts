import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuota} from 'src/app/models/cuota/cuota.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en SprinC
export class CuotasService {

  constructor(private http:HttpClient) {}

  list(): Observable<Cuota[]> { //lista de teatros, observable es como una promesa
    return this.http.get<Cuota[]>(`${environment.url_ms_negocio}/cuotas`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<Cuota> {
    return this.http.get<Cuota>(`${environment.url_ms_negocio}/cuotas/${id}`);
  }
  create(cuota:Cuota): Observable<Cuota> {
    return this.http.post<Cuota>(`${environment.url_ms_negocio}/cuotas`,cuota); //CentrosDistribucion es el body
  }
  update(cuota:Cuota): Observable<Cuota> {
    return this.http.put<Cuota>(`${environment.url_ms_negocio}/cuotas/${cuota.id}`,cuota);
  }
  


  delete(id: number) {
    return this.http.delete<Cuota>(`${environment.url_ms_negocio}/cuotas/${id}`);
  }
}
