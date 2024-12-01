import { Conductor } from "../conductor/conductor.model";
import { Vehiculo } from "../vehiculo/vehiculo.model";

export class VehiculoConductor {
    id?: number;
    fecha_inico: Date;
    fecha_fin: Date;
    vehiculo: Vehiculo;
    conductor: Conductor;
}
