import { Categoria } from "../categoria/categoria.model";
import { Producto } from "../producto/producto.model";

export class CategoriaProducto {
    id?: number;
    producto_id: number;
    categoria_id: number;
    detalle?: string;
}
