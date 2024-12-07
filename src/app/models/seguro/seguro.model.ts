import { Vehiculo } from "../vehiculo/vehiculo.model";

export class Seguro {
    id?: number;
    fecha_inicio: string;
    fecha_fin: string;
    compania_aseguradora: string;
    vehiculo_id: number;
}
