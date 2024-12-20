import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Conductor } from "src/app/models/conductor/conductor.model";
import { Vehiculo } from "src/app/models/vehiculo/vehiculo.model";
import { VehiculoConductor } from "src/app/models/vehiculoConductor/vehiculo-conductor.model";
import { ConductorService } from "src/app/services/conductores/conductores.service";
import { VehiculoService } from "src/app/services/vehiculos/vehiculos.service";
import { VehiculoConductorService } from "src/app/services/vehiculosConductores/vehiculos-conductores.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  vehiculoConductor: VehiculoConductor;
  vehiculos: Vehiculo[];
  conductores: Conductor[];
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private vehiculosConductoresService: VehiculoConductorService,
    private vehiculoService: VehiculoService,
    private conductorService: ConductorService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.vehiculoConductor = {
      id: 0,
      fecha_inicio: "",
      fecha_fin: "",
      vehiculo_id: {
        id: null,
        matricula: "",
        modelo: "",
        capacidad_carga: 0,
        tipo_carga: ""
      },
      conductor_id: {
        id: null,
        usuario_id: "",
        numero_licencia: "",
        fecha_vencimiento_licencia: "",
        telefono: "",
        fecha_nacimiento: ""
      },
    };
    this.mode = 0;
    this.conductores = [];
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


  conductoresList(){
    this.conductorService.list().subscribe(data => {
      
      this.conductores=data
      console.log(this.conductores);
      
    })
  }

  ngOnInit(): void {
    this.conductoresList()
    this.vehiculosList()
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.vehiculoConductor.id = this.activateRoute.snapshot.params.id;
      this.getVehiculoConductor(this.vehiculoConductor.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      fecha_inicio: [" ", [Validators.required]],
      fecha_fin: [" ", [Validators.required]],
      vehiculo_id: [null, [Validators.required]],
      conductor_id: [null, [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getVehiculoConductor(id: number) {
    this.vehiculosConductoresService.view(id).subscribe((data) => {
      this.vehiculoConductor = data;
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
    console.log(this.vehiculoConductor);

    this.vehiculosConductoresService
      .create(this.vehiculoConductor)
      .subscribe((data) => {
        Swal.fire(
          "Creado",
          "Se ha creado la relación entre vehiculo y conductor existosamente",
          "success"
        );
        this.router.navigate(["/vehiculosConductores/list"]); //Aqui me muevo para el theaters list
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
    if (!this.vehiculoConductor.id) {
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
    updateData.id = this.vehiculoConductor.id;

    this.vehiculosConductoresService.update(updateData).subscribe({
      next: (data) => {
        Swal.fire("Éxito", "Relación actualizado exitosamente", "success");
        this.router.navigate(["/vehiculosConductores/list"]);
      },
      error: (error) => {
        Swal.fire("Error", "No se pudo actualizar la relación", "error");
        console.error("Error al actualizar:", error);
      },
    });
  }
}
