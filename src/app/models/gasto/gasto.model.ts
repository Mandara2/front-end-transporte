import { Conductor } from "../conductor/conductor.model";
import { Dueno } from "../dueno/dueno.model";
import { Servicio } from "../servicio/servicio.model";

export class Gasto {
    id?: number;
    detalles: string;
    dueno_id:number;
    conductor_id: number;
    servicio_id: number;
}
