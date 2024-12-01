import { Contrato } from "../contrato/contrato.model";
import { VehiculoConductor } from "../vehiculoConductor/vehiculo-conductor.model";

export class Ruta {
    id?: number;
    punto_inicio: string;
    punto_destino: string;
    distancia: number;
    fecha_entrega: Date;
    contrato: Contrato;
    vehiculo_conductor: VehiculoConductor;
}
