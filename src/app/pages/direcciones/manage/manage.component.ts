import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Direccion } from "src/app/models/direccion/direccion.model";
import { Municipio } from "src/app/models/municipio/municipio.model";
import { DireccionService } from "src/app/services/direcciones/direcciones.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  direcciones: Direccion;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private direccionesService: DireccionService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.direcciones = {
      id: 0,
      localidad: "",
      tipo_direccion: "",
      calle: "",
      numero_direccion: "",
      referencias: "",
      municipio: new Municipio(),
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
      this.direcciones.id = this.activateRoute.snapshot.params.id;
      this.getDirecciones(this.direcciones.id);
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

  getDirecciones(id: number) {
    this.direccionesService.view(id).subscribe((data) => {
      this.direcciones = data;
    });
  }

  create() {
    this.direccionesService.create(this.direcciones).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado exitosamente", "success");
      this.router.navigate(["direcciones/list"]);
    });
  }
  update() {
    this.direccionesService.update(this.direcciones).subscribe((data) => {
      Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
      this.router.navigate(["direcciones/list"]);
    });
  }
}
