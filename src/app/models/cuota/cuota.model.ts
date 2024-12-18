import { Contrato } from "../contrato/contrato.model";

export class Cuota {
    id?: number;
    monto: number;
    intereses?: number;
    numero: number;
    contrato_id: Contrato;

}
