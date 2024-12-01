import { Cliente } from "../cliente/cliente.model";
import { PersonaNatural } from "../personaNatural/persona-natural.model";

export class Empresa {
    id?: number;
    nit: string
    direccion_fiscal?: string;
    cliente: Cliente;
    persona_natural: PersonaNatural;
}
