import { Direccion } from "../direccion/direccion.model";
import { Ruta } from "../ruta/ruta.model";

export class DirListaOrden {
    id?: number;
    orden: string;
    descripcion?: string;
    ruta_id: number;
    direccion_id: number;
}
