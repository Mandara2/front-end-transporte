import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Dueno} from 'src/app/models/dueno/dueno.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en SprinC
export class DuenoService {

  constructor(private http:HttpClient) {}

  list(): Observable<Dueno[]> { //lista de teatros, observable es como una promesa
    return this.http.get<Dueno[]>(`${environment.url_ms_negocio}/duenos`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<Dueno> {
    return this.http.get<{ theDueno: Dueno }>(`${environment.url_ms_negocio}/duenos/${id}`).pipe(
      map(response => response.theDueno)  // Extraemos solo el objeto administrador
    );
  }
  create(dueno:Dueno): Observable<Dueno> {
    return this.http.post<Dueno>(`${environment.url_ms_negocio}/duenos`,dueno); //CentrosDistribucion es el body
  }
  update(dueno:Dueno): Observable<Dueno> {
    return this.http.put<Dueno>(`${environment.url_ms_negocio}/duenos/${dueno.id}`,dueno);
  }
  


  delete(id: number) {
    return this.http.delete<Dueno>(`${environment.url_ms_negocio}/duenos/${id}`);
  }
}
