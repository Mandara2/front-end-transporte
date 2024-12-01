import { Cliente } from "../cliente/cliente.model";

export class Contrato {
    id?: number;
    fecha: Date;
    distancia_total: number;
    costo_total: number;
    cliente: Cliente;
}
