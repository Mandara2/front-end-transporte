import { Direccion } from "../direccion/direccion.model";
import { Ruta } from "../ruta/ruta.model";

export class DirListaOrden {
    id?: number;
    orden: string;
    descripcion?: string;
    ruta: Ruta;
    direccion: Direccion;
}
