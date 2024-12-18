import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Direccion } from "src/app/models/direccion/direccion.model";
import { Municipio } from "src/app/models/municipio/municipio.model";
import { DireccionService } from "src/app/services/direcciones/direcciones.service";
import { MunicipioService } from "src/app/services/municipios/municipios.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  direccion: Direccion;
  municipios: Municipio[];
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private direccionesService: DireccionService,
    private municipioService: MunicipioService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.direccion = {
      id: 0,
      localidad: "",
      tipo_direccion: "",
      calle: "",
      numero_direccion: "",
      referencias: "",
      municipio_id: {
        id: null,
        nombre: "",
        codigo_postal: "",
      },
    };
    this.mode = 0;
    this.municipios = []
    this.configFormGroup(); // 3. Vamos a llamar el metodo de configFormGroup *si este no se llama, mejor dicho no hizo nada*, e iniciamos la variable trySend = false
    this.trySend = false;
  }

  municipiosList(){
    this.municipioService.list().subscribe(data => {
      
      this.municipios=data
      console.log(this.municipios);
      
    })
  }

  ngOnInit(): void {
    this.municipiosList()
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.direccion.id = this.activateRoute.snapshot.params.id;
      this.getDirecciones(this.direccion.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      localidad: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      tipo_direccion: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(15),
        ],
      ],
      calle: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(15),
        ],
      ],
      numero_direccion: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(15),
        ],
      ],
      referencias: ["", [Validators.minLength(2), Validators.maxLength(30)]],
      municipio_id: [null, [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getDirecciones(id: number) {
    this.direccionesService.view(id).subscribe((data) => {
      this.direccion = data;
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
      
    this.direccionesService.create(this.direccion).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado exitosamente", "success");
      this.router.navigate(["direcciones/list"]);
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
    if (!this.direccion.id) {
      Swal.fire(
        "Error",
        "No se pudo encontrar la direccion para actualizar",
        "error"
      );
      return;
    }

    // Obtiene los valores del formulario
    const updatedData = this.theFormGroup.value;

    // Asegura que el id esté presente en el objeto de actualización
    updatedData.id = this.direccion.id;

    this.direccionesService.update(updatedData).subscribe({
      next: (data) => {
        Swal.fire("Éxito", "Direccion actualizado exitosamente", "success");
        this.router.navigate(["/direcciones/list"]);
      },
      error: (error) => {
        Swal.fire("Error", "No se pudo actualizar la direccion", "error");
        console.error("Error al actualizar:", error);
      },
    });
  }
}
