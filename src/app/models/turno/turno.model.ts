import { Conductor } from "../conductor/conductor.model";
import { VehiculoConductor } from "../vehiculoConductor/vehiculo-conductor.model";

export class Turno {
    id?: number;
    fecha_inicio: string;
    fecha_fin: string;
    conductor_id: Conductor;
}
