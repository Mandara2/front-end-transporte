import { Cliente } from "../cliente/cliente.model";

export class Contrato {
    id?: number;
    fecha: string;
    distancia_total: number;
    costo_total: number;
    cliente_id: Cliente;
}
