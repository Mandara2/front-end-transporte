import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CentroDistribucion } from "src/app/models/centroDistribucion/centro-distribucion.model";
import { Direccion } from "src/app/models/direccion/direccion.model";
import { CentrosDistribucionService } from "src/app/services/centrosDistribucion/centros-distribucion.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  centroDistribucion: CentroDistribucion;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private centrosDistribucionesService: CentrosDistribucionService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.centroDistribucion = {
      id: 0,
      nombre: "",
      capacidad_almacenamiento: 0,
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
      this.centroDistribucion.id = this.activateRoute.snapshot.params.id;
      this.getCentroDistribucion(this.centroDistribucion.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      nombre: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(15)],
      ],
      capacidad_almacenamiento: [0, [Validators.required, Validators.min(1),Validators.max(100000)]],
      direccion_id: [0,[Validators.required, Validators.min(1)]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getCentroDistribucion(id: number) {
    this.centrosDistribucionesService.view(id).subscribe((data) => {
      this.centroDistribucion = data;
    });
  }

  create() {
    this.centrosDistribucionesService
      .create(this.centroDistribucion)
      .subscribe((data) => {
        Swal.fire("Creado", "Se ha creado exitosamente", "success");
        this.router.navigate(["centroDistribuciones/list"]);
      });
  }
  update() {
    this.centrosDistribucionesService
      .update(this.centroDistribucion)
      .subscribe((data) => {
        Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
        this.router.navigate(["centroDistribuciones/list"]);
      });
  }
}
