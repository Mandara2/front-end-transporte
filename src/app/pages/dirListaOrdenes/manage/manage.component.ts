import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Direccion } from "src/app/models/direccion/direccion.model";
import { DirListaOrden } from "src/app/models/dirListaOrden/dir-lista-orden.model";
import { Ruta } from "src/app/models/ruta/ruta.model";
import { DirListaOrdenService } from "src/app/services/dirListaOrden/dir-lista-orden.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  dirListaOrden: DirListaOrden;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private dirListaOrdenesService: DirListaOrdenService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.dirListaOrden = {
      id: 0,
      orden: "",
      descripcion: "",
      ruta_id: 0,
      direccion_id: 0,
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
      this.dirListaOrden.id = this.activateRoute.snapshot.params.id;
      this.getDirListaOrden(this.dirListaOrden.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      orden: [
        "",
        [Validators.required, Validators.minLength(1), Validators.maxLength(4)],
      ],
      descripcion: ["", [Validators.maxLength(20)]],
      ruta_id: [0, [Validators.required, Validators.min(1)]],
      direccion_id: [0, [Validators.required, Validators.min(1)]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getDirListaOrden(id: number) {
    this.dirListaOrdenesService.view(id).subscribe((data) => {
      this.dirListaOrden = data;
    });
  }

  create() {
    this.dirListaOrdenesService.create(this.dirListaOrden).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado exitosamente", "success");
      this.router.navigate(["dirListaOrdenes/list"]);
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
    if (!this.dirListaOrden.id) {
      Swal.fire(
        "Error",
        "No se pudo encontrar la relación para actualizar",
        "error"
      );
      return;
    }

    // Obtiene los valores del formulario
    const updatedData = this.theFormGroup.value;

    // Asegura que el id esté presente en el objeto de actualización
    updatedData.id = this.dirListaOrden.id;

    this.dirListaOrdenesService.update(updatedData).subscribe({
      next: (data) => {
        Swal.fire("Éxito", "Relación actualizada exitosamente", "success");
        this.router.navigate(["/dirListaOrdenes/list"]);
      },
      error: (error) => {
        Swal.fire("Error", "No se pudo actualizar la relación", "error");
        console.error("Error al actualizar:", error);
      },
    });
  }
}
