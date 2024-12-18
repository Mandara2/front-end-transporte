import { Dueno } from "../dueno/dueno.model";
import { Vehiculo } from "../vehiculo/vehiculo.model";

export class DuenoVehiculo {
    id?: number;
    fecha_adquisicion: string;
    porcentaje_propiedad: number;
    vehiculo_id: Vehiculo;
    dueno_id: Dueno;
}
