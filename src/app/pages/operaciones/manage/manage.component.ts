import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Municipio } from "src/app/models/municipio/municipio.model";
import { Operacion } from "src/app/models/operacion/operacion.model";
import { Vehiculo } from "src/app/models/vehiculo/vehiculo.model";
import { MunicipioService } from "src/app/services/municipios/municipios.service";
import { OperacionService } from "src/app/services/operaciones/operaciones.service";
import { VehiculoService } from "src/app/services/vehiculos/vehiculos.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  operacion: Operacion;
  municipios: Municipio[];
  vehiculos: Vehiculo[];
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private operacionService: OperacionService,
    private municipioService: MunicipioService,
    private vehiculoService: VehiculoService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.operacion = {
      id: 0,
      fecha_inicio: "",
      fecha_fin: "",
      municipio_id: {
        id: null,
        nombre: "",
        codigo_postal: ""
      },
      vehiculo_id: {
        id: null,
        matricula: "",
        modelo: "",
        capacidad_carga: 0,
        tipo_carga: ""
      },
    };
    this.mode = 0;
    this.municipios = [];
    this.vehiculos= [];
    this.configFormGroup(); // 3. Vamos a llamar el metodo de configFormGroup *si este no se llama, mejor dicho no hizo nada*, e iniciamos la variable trySend = false
    this.trySend = false;
  }

  municipiosList(){
    this.municipioService.list().subscribe(data => {
      
      this.municipios=data
      console.log(this.municipios);
      
    })
  }

  vehiculosList(){
    this.vehiculoService.list().subscribe(data => {
      
      this.vehiculos=data
      console.log(this.vehiculos);
      
    })
  }

  ngOnInit(): void {
    this.municipiosList();
    this.vehiculosList();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.operacion.id = this.activateRoute.snapshot.params.id;
      this.getoperacion(this.operacion.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      fecha_inicio: [
        "",
        [
          Validators.required, // Campo obligatorio
        ],
      ],
      fecha_fin: ["", []],
      vehiculo_id: [
        null,
        [
          Validators.required, // Campo obligatorio
        ],
      ],
      municipio_id: [
        null,
        [
          Validators.required, // Campo obligatorio
        ],
      ],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getoperacion(id: number) {
    this.operacionService.view(id).subscribe((data) => {
      this.operacion = data;
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
    console.log(this.operacion);

    this.operacionService.create(this.operacion).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado el operacion existosamente", "success");
      this.router.navigate(["operaciones/list"]); //Aqui me muevo para el theaters list
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
    if (!this.operacion.id) {
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
    updateData.id = this.operacion.id;

    this.operacionService.update(updateData).subscribe({
      next: (data) => {
        Swal.fire("Éxito", "Vehículo actualizado exitosamente", "success");
        this.router.navigate(["/operaciones/list"]);
      },
      error: (error) => {
        Swal.fire("Error", "No se pudo actualizar el vehículo", "error");
        console.error("Error al actualizar:", error);
      },
    });
  }
}
