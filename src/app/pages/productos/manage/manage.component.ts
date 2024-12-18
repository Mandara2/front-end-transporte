import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Cliente } from "src/app/models/cliente/cliente.model";
import { Lote } from "src/app/models/lote/lote.model";
import { Producto } from "src/app/models/producto/producto.model";
import { ClienteService } from "src/app/services/cliente/cliente.service";
import { LoteService } from "src/app/services/lotes/lotes.service";
import { ProductoService } from "src/app/services/productos/productos.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  producto: Producto;
  lotes: Lote[]
  clientes: Cliente[]
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private productoService: ProductoService,
    private loteService: LoteService,
    private clienteService: ClienteService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.producto = {
      id: 0,
      nombre: "",
      fecha_vencimiento: "",
      cliente_id: {
        id: null,
        telefono: "",
        cantidad_pedidos_realizados: 0
      },
      lote_id: {
        id: null,
        peso: 0,
        volumen: 0,
        dir_lista_orden_id: null
      },
      
    };
    this.mode = 0;
    this.clientes = []
    this.lotes= [];
    this.configFormGroup(); // 3. Vamos a llamar el metodo de configFormGroup *si este no se llama, mejor dicho no hizo nada*, e iniciamos la variable trySend = false
    this.trySend = false;
  }

  lotesList(){
    this.loteService.list().subscribe(data => {
      
      this.lotes=data
      console.log(this.lotes);
      
    })
  }

  clientesList(){
    this.clienteService.list().subscribe(data => {
      
      this.clientes=data
      console.log(this.clientes);
      
    })
  }

  ngOnInit(): void {
    this.lotesList()
    this.clientesList()
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.producto.id = this.activateRoute.snapshot.params.id;
      this.getproducto(this.producto.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      nombre: [
        "",
        [
          Validators.required, // Campo obligatorio
        ],
      ],
      fecha_vencimiento: [
        "",
        [
          Validators.required, // Campo obligatorio
        ],
      ],
      cliente_id: [
        null,
        [
          Validators.required, // Campo obligatorio // Asegura que sea un número positivo
        ],
      ],
      lote_id: [
        null,
        [
          Validators.required, // Campo obligatorio
          // Asegura que sea un número positivo
        ],
      ],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getproducto(id: number) {
    this.productoService.view(id).subscribe((data) => {
      this.producto = data;
    });
  }

  create() {

    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Error en el formulario",
        " Ingrese correctamente los datos solicitados",
        "error"
      );
      return;
    }
    console.log(this.producto);

    this.productoService.create(this.producto).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado el producto existosamente", "success");
      this.router.navigate(["productos/list"]); //Aqui me muevo para el theaters list
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
    if (!this.producto.id) {
      Swal.fire(
        "Error",
        "No se pudo encontrar el vehículo para actualizar",
        "error"
      );
      return;
    }

    // Obtiene los valores del formulario
    const updateData = this.theFormGroup.value;

    // Asegura que el id esté presente en el objeto de actualización
    updateData.id = this.producto.id;

    this.productoService.update(updateData).subscribe({
      next: (data) => {
        Swal.fire("Éxito", "Vehículo actualizado exitosamente", "success");
        this.router.navigate(["/productos/list"]);
      },
      error: (error) => {
        Swal.fire("Error", "No se pudo actualizar el vehículo", "error");
        console.error("Error al actualizar:", error);
      },
    });
  }
}
