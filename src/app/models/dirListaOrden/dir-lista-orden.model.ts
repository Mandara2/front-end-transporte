import { Direccion } from "../direccion/direccion.model";
import { Ruta } from "../ruta/ruta.model";

export class DirListaOrden {
    id?: number;
    orden: number;
    descripcion?: string;
    ruta_id: Ruta;
    direccion_id: Direccion;
}
