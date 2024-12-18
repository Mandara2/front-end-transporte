import { Cliente } from "../cliente/cliente.model";
import { Lote } from "../lote/lote.model";

export class Producto {
    id?: number;
    nombre: string;
    fecha_vencimiento: string;
    cliente_id: Cliente;
    lote_id: Lote;
}
