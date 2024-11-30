import { Cliente } from "../cliente/cliente.model";
import { Lote } from "../lote/lote.model";

export class Producto {
    id?: number;
    nombre: string;
    fecha_vencimiento: Date;
    cliente: Cliente;
    lote: Lote;
}
