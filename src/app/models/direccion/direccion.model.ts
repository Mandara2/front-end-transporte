import { Municipio } from "../municipio/municipio.model";

export class Direccion {
    id?: number;
    localidad: string;
    tipo_direccion: string;
    calle: string;
    numero_direccion: string;
    referencias?: string;
    municipio_id: number;
}
