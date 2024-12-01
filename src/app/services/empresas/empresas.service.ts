import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa} from 'src/app/models/empresa/empresa.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en SprinC
export class EmpresaService {

  constructor(private http:HttpClient) {}

  list(): Observable<Empresa[]> { //lista de teatros, observable es como una promesa
    return this.http.get<Empresa[]>(`${environment.url_ms_negocio}/empresas`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<Empresa> {
    return this.http.get<Empresa>(`${environment.url_ms_negocio}/empresas/${id}`);
  }
  create(empresa:Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(`${environment.url_ms_negocio}/empresas`,empresa); //CentrosDistribucion es el body
  }
  update(empresa:Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`${environment.url_ms_negocio}/empresas/${empresa.id}`,empresa);
  }
  


  delete(id: number) {
    return this.http.delete<Empresa>(`${environment.url_ms_negocio}/empresas/${id}`);
  }
}
