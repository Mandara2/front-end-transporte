import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Dueno } from "src/app/models/dueno/dueno.model";
import { DuenoVehiculo } from "src/app/models/duenoVehiculo/dueno-vehiculo.model";
import { Vehiculo } from "src/app/models/vehiculo/vehiculo.model";
import { DuenoService } from "src/app/services/duenos/duenos.service";
import { DuenoVehiculoService } from "src/app/services/duenosVehiculos/duenos-vehiculos.service";
import { VehiculoService } from "src/app/services/vehiculos/vehiculos.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  duenoVehiculo: DuenoVehiculo;
  duenos: Dueno[];
  vehiculos: Vehiculo[];
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private duenoVehiculosService: DuenoVehiculoService,
    private duenoService: DuenoService,
    private vehiculoService: VehiculoService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.duenoVehiculo = {
      id: 0,
      fecha_adquisicion: "",
      porcentaje_propiedad: 0,
      vehiculo_id: {
        id: null,
        matricula: "",
        modelo: "",
        capacidad_carga: 0,
        tipo_carga: ""
      },
      dueno_id: {
        id: null,
        usuario_id: "",
        telefono: "",
        fecha_nacimiento: "",
        conductor_id: null
      },
    };
    this.mode = 0;
    this.duenos = [];
    this.vehiculos = [];
    this.configFormGroup(); // 3. Vamos a llamar el metodo de configFormGroup *si este no se llama, mejor dicho no hizo nada*, e iniciamos la variable trySend = false
    this.trySend = false;
  }

  vehiculosList(){
    this.vehiculoService.list().subscribe(data => {
      
      this.vehiculos=data
      console.log(this.vehiculos);
      
    })
  }

  duenosList(){
    this.duenoService.list().subscribe(data => {
      
      this.duenos=data
      console.log(this.duenos);
      
    })
  }

  ngOnInit(): void {
    this.vehiculosList();
    this.duenosList();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.duenoVehiculo.id = this.activateRoute.snapshot.params.id;
      this.getDuenoVehiculo(this.duenoVehiculo.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      porcentaje_propiedad: [
        0,
        [Validators.required, Validators.min(0)],
      ],
      fecha_adquisicion: [
        "",
        [Validators.required, Validators.pattern(/^\d{2,4}-\d{2}-\d{2}$/)],
      ],
      vehiculo_id: [null, [Validators.required]],
      dueno_id: [null, [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getDuenoVehiculo(id: number) {
    this.duenoVehiculosService.view(id).subscribe((data) => {
      this.duenoVehiculo = data;
    });
  }

  create() {
    this.duenoVehiculosService.create(this.duenoVehiculo).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado exitosamente", "success");
      this.router.navigate(["duenosVehiculos/list"]);
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
    if (!this.duenoVehiculo.id) {
      Swal.fire(
        "Error",
        "No se pudo encontrar la relación para actualizar",
        "error"
      );
      return;
    }

    // Obtiene los valores del formulario
    const updateData = this.theFormGroup.value;

    // Asegura que el id esté presente en el objeto de actualización
    updateData.id = this.duenoVehiculo.id;

    this.duenoVehiculosService.update(updateData).subscribe({
      next: (data) => {
        Swal.fire("Éxito", "Relación actualizado exitosamente", "success");
        this.router.navigate(["/duenosVehiculos/list"]);
      },
      error: (error) => {
        Swal.fire("Error", "No se pudo actualizar la relación", "error");
        console.error("Error al actualizar:", error);
      },
    });
  }
}
