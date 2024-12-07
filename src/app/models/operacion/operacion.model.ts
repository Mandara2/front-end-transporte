import { Municipio } from "../municipio/municipio.model";
import { Vehiculo } from "../vehiculo/vehiculo.model";

export class Operacion {
    id?: number;
    fecha_inicio: Date;
    fecha_fin?: Date;
    municipio_id: number;
    vehiculo_id: number;
}
