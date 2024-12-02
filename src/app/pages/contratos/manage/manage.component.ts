import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Cliente } from "src/app/models/cliente/cliente.model";
import { Contrato } from "src/app/models/contrato/contrato.model";
import { ContratoService } from "src/app/services/contratos/contratos.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  contrato: Contrato;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private contratosService: ContratoService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.contrato = {
      id: 0,
      fecha: new Date(),
      distancia_total: 0,
      costo_total: 0,
      cliente: new Cliente(),
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
      this.contrato.id = this.activateRoute.snapshot.params.id;
      this.getContrato(this.contrato.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      capacity: [
        0,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      location: ["", [Validators.required, Validators.minLength(2)]],
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
    this.contratosService.update(this.contrato).subscribe((data) => {
      Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
      this.router.navigate(["contratos/list"]);
    });
  }
}
