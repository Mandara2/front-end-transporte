import { Vehiculo } from "../vehiculo/vehiculo.model";

export class Seguro {
    id?: number;
    fecha_inicio: Date;
    fecha_fin: Date;
    compania_aseguradora: string;
    vehiculo: Vehiculo;
}
