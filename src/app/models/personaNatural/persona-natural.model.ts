import { Cliente } from "../cliente/cliente.model";

export class PersonaNatural {
    id?: number;
    usuario_id: string;
    identificacion: string;
    tipo_documento: string;
    fecha_nacimiento: string;
    cliente_id: Cliente;
}
