import { Servicio } from "../servicio/servicio.model";

export class Hotel {
    id?: number;
    estrellas: number;
    nombre: string;
    ubicacion?: string;
    servicio_id: number;
}
