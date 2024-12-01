import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel} from 'src/app/models/hotel/hotel.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) //Inyeccion como en SprinC
export class HotelService {

  constructor(private http:HttpClient) {}

  list(): Observable<Hotel[]> { //lista de teatros, observable es como una promesa
    return this.http.get<Hotel[]>(`${environment.url_ms_negocio}/hoteles`); //Esto devuelve una lista de teatros
  }
  view(id:number): Observable<Hotel> {
    return this.http.get<Hotel>(`${environment.url_ms_negocio}/hoteles/${id}`);
  }
  create(hotel:Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(`${environment.url_ms_negocio}/hoteles`,hotel); //CentrosDistribucion es el body
  }
  update(hotel:Hotel): Observable<Hotel> {
    return this.http.put<Hotel>(`${environment.url_ms_negocio}/hoteles/${hotel.id}`,hotel);
  }
  


  delete(id: number) {
    return this.http.delete<Hotel>(`${environment.url_ms_negocio}/hoteles/${id}`);
  }
}
