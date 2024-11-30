import { Conductor } from "../conductor/conductor.model";
import { Dueno } from "../dueno/dueno.model";
import { Servicio } from "../servicio/servicio.model";

export class Gasto {
    id?: number;
    detalles: string;
    dueno: Dueno;
    conductor: Conductor;
    servicio: Servicio;
}
