import { Cuota } from "../cuota/cuota.model";
import { Gasto } from "../gasto/gasto.model";

export class Factura {
    id?: number;
    fecha: string;
    monto: number;
    estado: string;
    detalles?: string;
    cuota_id: number;
    gasto_id: number;
}
