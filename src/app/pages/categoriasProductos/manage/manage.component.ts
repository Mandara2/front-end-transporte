import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Categoria } from "src/app/models/categoria/categoria.model";
import { CategoriaProducto } from "src/app/models/categoriaProducto/categoria-producto.model";
import { Producto } from "src/app/models/producto/producto.model";
import { CategoriaProductoService } from "src/app/services/categoriasProductos/catagorias-productos.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  categoriaProducto: CategoriaProducto;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private categoriasProductosService: CategoriaProductoService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.categoriaProducto = {
      id: 0,
      producto_id: 0,
      categoria_id: 0,
      detalle: "",
    };
    this.mode = 0;
    this.configFormGroup(); // 3. Vamos a llamar el metodo de configFormGroup *si este no se llama, mejor dicho no hizo nada*, e iniciamos la variable trySend = false
    this.trySend = false;
  }

  ngOnInit(): void {
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
      producto_id: [
        0,
        [Validators.required, Validators.min(1)],
      ],
      categoria_id: ["", [Validators.required,Validators.min(1)]],
      detalle:[0,[Validators.required,Validators.maxLength(20)]]
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
    this.categoriasProductosService
      .update(this.categoriaProducto)
      .subscribe((data) => {
        Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
        this.router.navigate(["categoriasProductos/list"]);
      });
  }
}
