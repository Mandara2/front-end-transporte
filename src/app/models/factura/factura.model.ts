import { Cuota } from "../cuota/cuota.model";
import { Gasto } from "../gasto/gasto.model";

export class Factura {
    id?: number;
    fecha_hora: string;
    monto: number;
    estado: string;
    detalles?: string;
    cuota_id: Cuota;
    gasto_id: Gasto;
}
