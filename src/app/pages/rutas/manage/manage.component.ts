import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Ruta } from "src/app/models/ruta/ruta.model";
import { RutaService } from "src/app/services/rutas/rutas.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  ruta: Ruta;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private rutaService: RutaService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.ruta = {
      id: 0,
      punto_inicio: "",
      punto_destino: "",
      distancia: 0,
      fecha_entrega: "",
      contrato_id: 0,
      vehiculo_conductor_id: 0,
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
      this.ruta.id = this.activateRoute.snapshot.params.id;
      this.getruta(this.ruta.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      punto_inicio: [
        "",
        [
          Validators.required, // Campo obligatorio
        ],
      ],
      punto_destino: [
        "",
        [
          Validators.required, // Campo obligatorio
        ],
      ],
      distancia: [
        "",
        [
          Validators.required, // Campo obligatorio
          Validators.min(0), // Solo valores positivos
        ],
      ],
      fecha_entrega: [
        "",
        [
          Validators.required, // Campo obligatorio
        ],
      ],
      contrato_id: [
        "",
        [
          Validators.required, // Campo obligatorio
          Validators.min(1), // Asegura que sea positivo
        ],
      ],
      vehiculo_conductor_id: [
        "",
        [
          Validators.required, // Campo obligatorio
          Validators.min(1), // Asegura que sea positivo
        ],
      ],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getruta(id: number) {
    this.rutaService.view(id).subscribe((data) => {
      this.ruta = data;
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
    console.log(this.ruta);

    this.rutaService.create(this.ruta).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado la ruta existosamente", "success");
      this.router.navigate(["rutas/list"]); //Aqui me muevo para el theaters list
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
    if (!this.ruta.id) {
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
    updateData.id = this.ruta.id;

    this.rutaService.update(updateData).subscribe({
      next: (data) => {
        Swal.fire("Éxito", "Vehículo actualizado exitosamente", "success");
        this.router.navigate(["/rutas/list"]);
      },
      error: (error) => {
        Swal.fire("Error", "No se pudo actualizar el vehículo", "error");
        console.error("Error al actualizar:", error);
      },
    });
  }
}
