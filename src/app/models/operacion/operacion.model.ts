import { Municipio } from "../municipio/municipio.model";
import { Vehiculo } from "../vehiculo/vehiculo.model";

export class Operacion {
    id?: number;
    fecha_inicio: string;
    fecha_fin?: string;
    municipio_id: number;
    vehiculo_id: number;
}
