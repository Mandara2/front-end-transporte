import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  // Buscar usuario por número telefónico
  buscarUsuarioPorTelefono(numeroTelefono: string): Observable<any> {
    return this.http.get(`${environment.url_ms_negocio}/chats/buscar-usuario?telefono=${numeroTelefono}`);
  }

  // Enviar mensaje
  enviarMensaje(mensaje: any): Observable<any> {
    return this.http.post(`${environment.url_ms_negocio}/chats/enviar-mensaje`, mensaje);
  }

  obtenerMensajes(telefonoRemitente: string, telefonoDestinatario: string): Observable<any> {
    return this.http.get(`${environment.url_ms_negocio}/chats/obtener-mensajes`, {
      params: { telefono_remitente: telefonoRemitente, telefono_destinatario: telefonoDestinatario }
    });
  }

  obtenerTelefono(userId: string): Observable<any> {
    return this.http.get(`${environment.url_ms_negocio}/chats/obtener-telefono/${userId}`);
  }
  
}
