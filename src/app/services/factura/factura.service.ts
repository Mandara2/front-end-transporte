import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura} from 'src/app/models/factura/factura.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en SprinC
export class FacturaService {

  constructor(private http:HttpClient) {}

  list(): Observable<Factura[]> { //lista de teatros, observable es como una promesa
    return this.http.get<Factura[]>(`${environment.url_ms_negocio}/facturas`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<Factura> {
    return this.http.get<Factura>(`${environment.url_ms_negocio}/facturas/${id}`);
  }
  create(factura:Factura): Observable<Factura> {
    return this.http.post<Factura>(`${environment.url_ms_negocio}/facturas`,factura); //CentrosDistribucion es el body
  }
  update(factura:Factura): Observable<Factura> {
    return this.http.put<Factura>(`${environment.url_ms_negocio}/facturas/${factura.id}`,factura);
  }
  


  delete(id: number) {
    return this.http.delete<Factura>(`${environment.url_ms_negocio}/facturas/${id}`);
  }
}
