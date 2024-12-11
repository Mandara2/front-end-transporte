import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Conductor } from "src/app/models/conductor/conductor.model";
import { Dueno } from "src/app/models/dueno/dueno.model";
import { DuenoService } from "src/app/services/duenos/duenos.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  dueno: Dueno;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private duenosService: DuenoService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.dueno = {
      id: 0,
      usuario_id: "",
      telefono: "",
      fecha_nacimiento: "",
      conductor_id: 0,
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
      this.dueno.id = this.activateRoute.snapshot.params.id;
      this.getDueno(this.dueno.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      usuario_id: ["", [Validators.required]],
      telefono: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(/^[\d\-]+$/),
        ],
      ],
      fecha_nacimiento: [
        "",
        [Validators.required, Validators.pattern(/^\d{2,4}-\d{2}-\d{2}$/)],
      ],
      conductor_id: [0, [Validators.required, Validators.min(1)]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getDueno(id: number) {
    this.duenosService.view(id).subscribe((data) => {
      this.dueno = data;
    });
  }

  create() {
    this.duenosService.create(this.dueno).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado exitosamente", "success");
      this.router.navigate(["duenos/list"]);
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
    if (!this.dueno.id) {
      Swal.fire(
        "Error",
        "No se pudo encontrar el dueño para actualizar",
        "error"
      );
      return;
    }

    // Obtiene los valores del formulario
    const updateData = this.theFormGroup.value;

    // Asegura que el id esté presente en el objeto de actualización
    updateData.id = this.dueno.id;

    this.duenosService.update(updateData).subscribe({
      next: (data) => {
        Swal.fire("Éxito", "Dueño actualizado exitosamente", "success");
        this.router.navigate(["/duenos/list"]);
      },
      error: (error) => {
        Swal.fire("Error", "No se pudo actualizar el dueño", "error");
        console.error("Error al actualizar:", error);
      },
    });
  }
}
