import { Categoria } from "../categoria/categoria.model";
import { Producto } from "../producto/producto.model";

export class CategoriaProducto {
    id?: number;
    producto: Producto;
    categoria: Categoria;
    detalle?: string;
}
