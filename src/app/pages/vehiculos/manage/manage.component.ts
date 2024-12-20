import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Vehiculo } from "src/app/models/vehiculo/vehiculo.model";
import { VehiculoService } from "src/app/services/vehiculos/vehiculos.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  vehiculo: Vehiculo;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private vehiculoService: VehiculoService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.vehiculo = {
      id: 0,
      matricula: "",
      modelo: "",
      capacidad_carga: 0,
      tipo_carga: "",
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
      this.vehiculo.id = this.activateRoute.snapshot.params.id;
      this.getVehiculo(this.vehiculo.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      matricula: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9\-]+$/), // `alphaNum` con guion permitido
        ],
      ],
      modelo: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9 ]+$/), // `alphaNum` con espacio permitido
        ],
      ],
      capacidad_carga: [
        "",
        [
          Validators.required,
          Validators.min(1), // `unsigned`
        ],
      ],
      tipo_carga: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9\- ]+$/), // `alphaNum` con espacio y guion permitidos
        ],
      ],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getVehiculo(id: number) {
    this.vehiculoService.view(id).subscribe((data) => {
      this.vehiculo = data;
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
    console.log(this.vehiculo);

    this.vehiculoService.create(this.vehiculo).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado el vehiculo existosamente", "success");
      this.router.navigate(["vehiculos/list"]); //Aqui me muevo para el theaters list
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

    if (!this.vehiculo.id) {
      Swal.fire(
        "Error",
        "No se pudo encontrar el vehículo para actualizar",
        "error"
      );
      return;
    }

    // Obtiene los valores del formulario
    const updateData = this.theFormGroup.value;

    updateData.id = this.vehiculo.id;

    this.vehiculoService.update(updateData).subscribe({
      next: (data) => {
        Swal.fire("Éxito", "Vehículo actualizado exitosamente", "success");
        this.router.navigate(["/vehiculos/list"]);
      },
      error: (error) => {
        Swal.fire("Error", "No se pudo actualizar el vehículo", "error");
        console.error("Error al actualizar:", error);
      },
    });
  }
}
