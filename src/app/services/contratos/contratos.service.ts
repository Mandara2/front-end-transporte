import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contrato} from 'src/app/models/contrato/contrato.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en Spring
export class ContratoService {

  constructor(private http:HttpClient) {}

  list(): Observable<Contrato[]> { //lista de teatros, observable es como una promesa
    return this.http.get<Contrato[]>(`${environment.url_ms_negocio}/contratos`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<Contrato> {
    return this.http.get<Contrato>(`${environment.url_ms_negocio}/contratos/${id}`);
  }
  create(contrato:Contrato): Observable<Contrato> {
    return this.http.post<Contrato>(`${environment.url_ms_negocio}/contratos`,contrato); //CentrosDistribucion es el body
  }
  update(contrato:Contrato): Observable<Contrato> {
    return this.http.put<Contrato>(`${environment.url_ms_negocio}/contratos/${contrato.id}`,contrato);
  }
  


  delete(id: number) {
    return this.http.delete<Contrato>(`${environment.url_ms_negocio}/contratos/${id}`);
  }
}
