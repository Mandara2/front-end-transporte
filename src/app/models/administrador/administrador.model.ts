import { Servicio } from "../servicio/servicio.model";

export class Administrador {
    id?: number;
    usuario_id: string;
    tipo: string;
    telefono: string;
    servicio: Servicio;
}
