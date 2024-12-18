import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Categoria } from "src/app/models/categoria/categoria.model";
import { CategoriaProducto } from "src/app/models/categoriaProducto/categoria-producto.model";
import { Producto } from "src/app/models/producto/producto.model";
import { CategoriaService } from "src/app/services/categorias/catorias.service";
import { CategoriaProductoService } from "src/app/services/categoriasProductos/catagorias-productos.service";
import { ProductoService } from "src/app/services/productos/productos.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  categoriaProducto: CategoriaProducto;
  productos: Producto[];
  categorias: Categoria[];
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private categoriasProductosService: CategoriaProductoService,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.categoriaProducto = {
      id: 0,
      producto_id: {
        id: null,
        nombre: "",
        fecha_vencimiento: "",
        cliente_id: null,
        lote_id: null
      },
      categoria_id: {
        id: null,
        nombre: "",
        descripcion: "",
        categoria_padre: null
      },
      detalle: "",
    };
    this.mode = 0;
    this.productos = [];
    this.categorias = [];
    this.configFormGroup(); // 3. Vamos a llamar el metodo de configFormGroup *si este no se llama, mejor dicho no hizo nada*, e iniciamos la variable trySend = false
    this.trySend = false;
  }

  productosList(){
    this.productoService.list().subscribe(data => {
      
      this.productos=data
      console.log(this.productos);
      
    })
  }

  categoriasList(){
    this.categoriaService.list().subscribe(data => {
      
      this.categorias=data
      console.log(this.categorias);
      
    })
  }

  ngOnInit(): void {
    this.categoriasList();
    this.productosList();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.categoriaProducto.id = this.activateRoute.snapshot.params.id;
      this.getCategoriaProducto(this.categoriaProducto.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      producto_id: [null, [Validators.required]],
      categoria_id: [null, [Validators.required]],
      detalle: [0, [Validators.required, Validators.maxLength(20)]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getCategoriaProducto(id: number) {
    this.categoriasProductosService.view(id).subscribe((data) => {
      this.categoriaProducto = data;
    });
  }

  create() {
    this.categoriasProductosService
      .create(this.categoriaProducto)
      .subscribe((data) => {
        Swal.fire("Creado", "Se ha creado exitosamente", "success");
        this.router.navigate(["categoriasProductos/list"]);
      });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Formulario invalido",
        "Ingrese correctamente los datos",
        "error"
      );
      return;
    }

    // Verifica si el vehículo tiene un id antes de realizar la actualización
    if (!this.categoriaProducto.id) {
      Swal.fire(
        "Error",
        "No se pudo encontrar la relacion entre categoria y producto para actualizar",
        "error"
      );
      return;
    }

    // Obtiene los valores del formulario
    const updatedData = this.theFormGroup.value;

    // Asegura que el id esté presente en el objeto de actualización
    updatedData.id = this.categoriaProducto.id;

    this.categoriasProductosService.update(updatedData).subscribe({
      next: (data) => {
        Swal.fire("Éxito", "Relación actualizada exitosamente", "success");
        this.router.navigate(["/categoriasProductos/list"]);
      },
      error: (error) => {
        Swal.fire("Error", "No se pudo actualizar la relación", "error");
        console.error("Error al actualizar:", error);
      },
    });
  }
}
