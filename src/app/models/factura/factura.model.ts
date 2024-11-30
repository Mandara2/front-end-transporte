import { Cuota } from "../cuota/cuota.model";
import { Gasto } from "../gasto/gasto.model";

export class Factura {
    id?: number;
    fecha: Date;
    monto: number;
    estado: string;
    detalles?: string;
    cuota: Cuota;
    gasto: Gasto;
}
