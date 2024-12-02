import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Dueno } from "src/app/models/dueno/dueno.model";
import { DuenoVehiculo } from "src/app/models/duenoVehiculo/dueno-vehiculo.model";
import { Vehiculo } from "src/app/models/vehiculo/vehiculo.model";
import { DuenoVehiculoService } from "src/app/services/duenosVehiculos/duenos-vehiculos.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  duenoVehiculo: DuenoVehiculo;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private duenoVehiculosService: DuenoVehiculoService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.duenoVehiculo = {
      id: 0,
      fecha_adquisicion: new Date(),
      porcentaje_propiedad: 0,
      vehiculo: new Vehiculo(),
      dueno: new Dueno(),
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
      this.duenoVehiculo.id = this.activateRoute.snapshot.params.id;
      this.getDuenoVehiculo(this.duenoVehiculo.id);
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

  getDuenoVehiculo(id: number) {
    this.duenoVehiculosService.view(id).subscribe((data) => {
      this.duenoVehiculo = data;
    });
  }

  create() {
    this.duenoVehiculosService.create(this.duenoVehiculo).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado exitosamente", "success");
      this.router.navigate(["duenoVehiculos/list"]);
    });
  }
  update() {
    this.duenoVehiculosService.update(this.duenoVehiculo).subscribe((data) => {
      Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
      this.router.navigate(["duenoVehiculos/list"]);
    });
  }
}
