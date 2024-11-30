export class RutaModel {
  id: number;
  punto_inicio: string;
  punto_destino: string;
  distancia: number;
  fecha_entrega: Date;
  contrato_id?: number;
  vehiculo_conductor_id: number;
}
