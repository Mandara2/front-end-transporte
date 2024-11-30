import { Servicio } from "../servicio/servicio.model";

export class Restaurante {
    id?: number;
    nombre: string;
    ubicacion?: string;
    servicio: Servicio;
}
