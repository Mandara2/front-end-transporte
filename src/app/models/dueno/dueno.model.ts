import { Conductor } from "../conductor/conductor.model";

export class Dueno {
    id?: number;
    usuario_id: string;
    telefono: string;
    fecha_nacimiento: string;
    conductor_id: Conductor;
}
