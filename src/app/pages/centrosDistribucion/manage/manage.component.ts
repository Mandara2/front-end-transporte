import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CentroDistribucion } from "src/app/models/centroDistribucion/centro-distribucion.model";
import { Direccion } from "src/app/models/direccion/direccion.model";
import { CentrosDistribucionService } from "src/app/services/centrosDistribucion/centros-distribucion.service";
import { DireccionService } from "src/app/services/direcciones/direcciones.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  centroDistribucion: CentroDistribucion;
  direcciones: Direccion[]
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private centrosDistribucionesService: CentrosDistribucionService,
    private direccionService: DireccionService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.centroDistribucion = {
      id: 0,
      nombre: "",
      capacidad_almacenamiento: 0,
      direccion_id: {
        id: null,
        localidad: "",
        tipo_direccion: "",
        calle: "",
        numero_direccion: "",
        referencias: "",
        municipio_id: null
      },
    };
    this.mode = 0;
    this.direcciones = []
    this.configFormGroup(); // 3. Vamos a llamar el metodo de configFormGroup *si este no se llama, mejor dicho no hizo nada*, e iniciamos la variable trySend = false
    this.trySend = false;
  }

  direccionesList(){
    this.direccionService.list().subscribe(data => {
      
      this.direcciones=data
      console.log(this.direcciones);
      
    })
  }

  ngOnInit(): void {
    this.direccionesList();
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
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(15),
        ],
      ],
      capacidad_almacenamiento: [
        0,
        [Validators.required, Validators.min(1), Validators.max(100000)],
      ],
      direccion_id: [null, [Validators.required]],
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
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Formulario inválido",
        "Por favor complete correctamente todos los campos.",
        "error"
      );
      return;
    }
  
    this.centrosDistribucionesService.create(this.centroDistribucion).subscribe({
      next: (data) => {
        Swal.fire("Éxito", "Se ha creado el centro de distribución exitosamente", "success");
        this.router.navigate(["centrosDistribucion/list"]);
      },
      error: (error) => {
        if (error.status === 409) {
          Swal.fire(
            "Error",
            error.error.error || "La dirección ya está asignada a otro centro de distribución.",
            "error"
          );
        } else {
          Swal.fire(
            "Error",
            "Ocurrió un problema al crear el centro de distribución.",
            "error"
          );
          console.error("Error en la creación:", error);
        }
      },
    });
  }
  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Formulario inválido",
        "Ingrese correctamente los datos.",
        "error"
      );
      return;
    }
  
    if (!this.centroDistribucion.id) {
      Swal.fire(
        "Error",
        "No se pudo encontrar el centro de distribución para actualizar.",
        "error"
      );
      return;
    }
  
    const updatedData = this.theFormGroup.value;
    updatedData.id = this.centroDistribucion.id;
  
    this.centrosDistribucionesService.update(updatedData).subscribe({
      next: (data) => {
        Swal.fire(
          "Éxito",
          "Centro de distribución actualizado exitosamente.",
          "success"
        );
        this.router.navigate(["centrosDistribucion/list"]);
      },
      error: (error) => {
        if (error.status === 409) {
          Swal.fire(
            "Error",
            error.error.error || "La dirección ya está asignada a otro centro de distribución.",
            "error"
          );
        } else {
          Swal.fire(
            "Error",
            "No se pudo actualizar el centro de distribución.",
            "error"
          );
          console.error("Error en la actualización:", error);
        }
      },
    });
  }
}
