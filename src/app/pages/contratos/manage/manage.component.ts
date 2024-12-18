import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Cliente } from "src/app/models/cliente/cliente.model";
import { Contrato } from "src/app/models/contrato/contrato.model";
import { ClienteService } from "src/app/services/cliente/cliente.service";
import { ContratoService } from "src/app/services/contratos/contratos.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  contrato: Contrato;
  clientes: Cliente[];
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private contratosService: ContratoService,
    private clienteService: ClienteService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.contrato = {
      id: 0,
      fecha: "",
      distancia_total: 0,
      costo_total: 0,
      cliente_id: {
        id: null,
        telefono: "",
        cantidad_pedidos_realizados: 0
      },
    };
    this.mode = 0;
    this.configFormGroup(); // 3. Vamos a llamar el metodo de configFormGroup *si este no se llama, mejor dicho no hizo nada*, e iniciamos la variable trySend = false
    this.trySend = false;
  }

  clientesList(){
    this.clienteService.list().subscribe(data => {
      
      this.clientes=data
      console.log(this.clientes);
      
    })
  }

  ngOnInit(): void {
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
      this.contrato.id = this.activateRoute.snapshot.params.id;
      this.getContrato(this.contrato.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      fecha: [
        0,
        [Validators.required, Validators.pattern(/^\d{2,4}-\d{2}-\d{2}$/)],
      ],
      distancia_total: [0, [Validators.required, Validators.min(0)]],
      costo_total: [0, [Validators.required, Validators.min(0)]],
      cliente_id: [null, [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getContrato(id: number) {
    this.contratosService.view(id).subscribe((data) => {
      this.contrato = data;
    });
  }

  create() {
    this.contratosService.create(this.contrato).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado exitosamente", "success");
      this.router.navigate(["contratos/list"]);
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
    if (!this.contrato.id) {
      Swal.fire(
        "Error",
        "No se pudo encontrar el contrato para actualizar",
        "error"
      );
      return;
    }

    // Obtiene los valores del formulario
    const updatedData = this.theFormGroup.value;

    // Asegura que el id esté presente en el objeto de actualización
    updatedData.id = this.contrato.id;

    this.contratosService.update(updatedData).subscribe({
      next: (data) => {
        Swal.fire("Éxito", "Contrato actualizado exitosamente", "success");
        this.router.navigate(["/contratos/list"]);
      },
      error: (error) => {
        Swal.fire("Error", "No se pudo actualizar el contrato", "error");
        console.error("Error al actualizar:", error);
      },
    });
  }
}
