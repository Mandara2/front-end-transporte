import { Conductor } from "../conductor/conductor.model";
import { Vehiculo } from "../vehiculo/vehiculo.model";

export class VehiculoConductor {
    id?: number;
    fecha_inicio: string;
    fecha_fin: string;
    vehiculo_id: number;
    conductor_id: number;
}
