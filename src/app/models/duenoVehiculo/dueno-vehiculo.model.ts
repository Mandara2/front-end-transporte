import { Dueno } from "../dueno/dueno.model";
import { Vehiculo } from "../vehiculo/vehiculo.model";

export class DuenoVehiculo {
    id?: number;
    fecha_adquisicion: Date;
    porcentaje_propiedad: number;
    vehiculo: Vehiculo;
    dueno: Dueno;
}
