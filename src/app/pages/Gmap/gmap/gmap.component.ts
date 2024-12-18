import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss']
})
export class GmapComponent implements OnInit {
  contratoId: string = ''; // ID ingresado por el usuario
  longitude: string = '-';
  latitude: string = '-';
  private map: L.Map | undefined;
  private marker: L.Marker | undefined;
  

  constructor(private theWebSocketService: WebSocketService) { }

   ngOnInit(): void {

    // Inicializar el mapa
    this.map = L.map('map').setView([0, 0], 2); // Coordenadas iniciales
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Agregar marcador inicial
    this.marker = L.marker([0, 0]).addTo(this.map);

    //conection websocket inicial 
    this.theWebSocketService.setNameEvent("news");
    this.theWebSocketService.callback.subscribe(data => {
      console.log("llegando desde el backend " + JSON.stringify(data));
    });
  }

    subscribeToCoordinates(): void {
      if (!this.contratoId) {
        alert('Por favor, ingresa un ID de contrato válido.');
        return;
      }

      // Eliminar cualquier suscripción previa
      this.theWebSocketService.off();

      this.theWebSocketService.setNameEvent(`coordinates/${this.contratoId}`);
      this.theWebSocketService.callback.subscribe(data => {
        console.log('Actualización recibida:', data);

        // Actualizar la última coordenada recibida
        this.longitude = data.longitude;
        this.latitude = data.latitude;

        // Actualizar el marcador y centrar el mapa
        if (this.marker && this.map) {
          this.marker.setLatLng([this.latitude, this.longitude]);
          this.map.setView([this.latitude, this.longitude], 8);
        }
      });
      
    }


}
