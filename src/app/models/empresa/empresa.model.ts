import { Cliente } from "../cliente/cliente.model";
import { PersonaNatural } from "../personaNatural/persona-natural.model";

export class Empresa {
    id?: number;
    nit: string
    tipo_empresa: string;
    direccion_fiscal?: string;
    cliente_id: number;
    persona_natural_id: number;
}
