import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente} from 'src/app/models/cliente/cliente.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en Spring
export class ClienteService {

  constructor(private http:HttpClient) {}

  list(): Observable<Cliente[]> { //lista de teatros, observable es como una promesa
    return this.http.get<Cliente[]>(`${environment.url_ms_negocio}/clientes`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<Cliente> {
    return this.http.get<Cliente>(`${environment.url_ms_negocio}/clientes/${id}`);
  }
  create(cliente:Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${environment.url_ms_negocio}/clientes`,cliente); //CentrosDistribucion es el body
  }
  update(cliente:Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${environment.url_ms_negocio}/clientes/${cliente.id}`,cliente);
  }
  


  delete(id: number) {
    return this.http.delete<Cliente>(`${environment.url_ms_negocio}/clientes/${id}`);
  }
}
