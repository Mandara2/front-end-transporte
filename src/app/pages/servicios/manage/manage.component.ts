import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Servicio } from "src/app/models/servicio/servicio.model";
import { ServicioService } from "src/app/services/servicios/servicios.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  servicio: Servicio;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private servicioService: ServicioService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.servicio = {
      id: 0,
      fecha: "",
      descripcion: "",
      administrador_id: 0,
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
      this.servicio.id = this.activateRoute.snapshot.params.id;
      this.getservicio(this.servicio.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      fecha: ["", [Validators.required]],
      descripcion: [
        "",
        [
          Validators.required, // Campo obligatorio
          Validators.pattern(/^[a-zA-Z0-9 _\-]+$/), // `alphaNum` con espacio, guion bajo y guion permitidos
        ],
      ],
      administrador_id: [
        "",
        [
          Validators.required,
          Validators.min(1), // `unsigned`
        ],
      ],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getservicio(id: number) {
    this.servicioService.view(id).subscribe((data) => {
      this.servicio = data;
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
    console.log(this.servicio);

    this.servicioService.create(this.servicio).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado el servicio existosamente", "success");
      this.router.navigate(["servicios/list"]); //Aqui me muevo para el theaters list
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
    if (!this.servicio.id) {
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
    updateData.id = this.servicio.id;

    this.servicioService.update(updateData).subscribe({
      next: (data) => {
        Swal.fire("Éxito", "Vehículo actualizado exitosamente", "success");
        this.router.navigate(["/servicios/list"]);
      },
      error: (error) => {
        Swal.fire("Error", "No se pudo actualizar el vehículo", "error");
        console.error("Error al actualizar:", error);
      },
    });
  }
}
