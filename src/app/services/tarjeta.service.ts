import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Tarjeta } from "src/app/models/tarjeta/tarjeta.model"; // Asegúrate de tener un modelo de Tarjeta

@Injectable({
  providedIn: "root",
})
export class TarjetaService {
  constructor(private http: HttpClient) {}

  // Obtener las tarjetas asociadas a un usuario
  getTarjetasByUserId(usuarioId: string): Observable<Tarjeta[]> {
    return this.http.get<Tarjeta[]>(
      `${environment.url_ms_security}/api/public/tarjetas/${usuarioId}`
    );
  }

  // Procesar el pago
  procesarPago(pago: any): Observable<any> {
    return this.http.post<any>(
      `${environment.url_ms_security}/api/public/tarjetas/procesar-pago`,
      pago
    );
  }
}
