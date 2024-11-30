import { Departamento } from "../departamento/departamento.model";

export class Municipio {
    id?: number;
    nombre: string;
    codigo_postal: string;
    departamento: Departamento;
}
