import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Conductor } from "src/app/models/conductor/conductor.model";
import { Dueno } from "src/app/models/dueno/dueno.model";
import { Gasto } from "src/app/models/gasto/gasto.model";
import { Servicio } from "src/app/models/servicio/servicio.model";
import { GastoService } from "src/app/services/gastos/gastos.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  gasto: Gasto;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private gastosService: GastoService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.gasto = {
      id: 0,
      detalles: "",
      dueno: new Dueno(),
      conductor: new Conductor(),
      servicio: new Servicio(),
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
      this.gasto.id = this.activateRoute.snapshot.params.id;
      this.getGasto(this.gasto.id);
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

  getGasto(id: number) {
    this.gastosService.view(id).subscribe((data) => {
      this.gasto = data;
    });
  }

  create() {
    this.gastosService.create(this.gasto).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado exitosamente", "success");
      this.router.navigate(["gastos/list"]);
    });
  }
  update() {
    this.gastosService.update(this.gasto).subscribe((data) => {
      Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
      this.router.navigate(["gastos/list"]);
    });
  }
}
