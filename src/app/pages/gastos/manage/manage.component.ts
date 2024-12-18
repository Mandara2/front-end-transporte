import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Conductor } from "src/app/models/conductor/conductor.model";
import { Dueno } from "src/app/models/dueno/dueno.model";
import { Gasto } from "src/app/models/gasto/gasto.model";
import { Servicio } from "src/app/models/servicio/servicio.model";
import { ConductorService } from "src/app/services/conductores/conductores.service";
import { DuenoService } from "src/app/services/duenos/duenos.service";
import { GastoService } from "src/app/services/gastos/gastos.service";
import { ServicioService } from "src/app/services/servicios/servicios.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  gasto: Gasto;
  duenos: Dueno[]
  conductores: Conductor[];
  servicios: Servicio[];
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private gastosService: GastoService,
    private duenoService: DuenoService,
    private conductorService: ConductorService,
    private servicioService: ServicioService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.gasto = {
      id: 0,
      detalles: "",
      dueno_id: {
        id: null,
        usuario_id: "",
        telefono: "",
        fecha_nacimiento: "",
        conductor_id: null 
      },
      conductor_id: {
        id: null,
        usuario_id: "",
        telefono: "",
        numero_licencia: "",
        fecha_nacimiento: "",
        fecha_vencimiento_licencia: ""
      },
      servicio_id: {
        id: null,
        fecha: "",
        descripcion: "",
        administrador_id: null
      },
    };
    this.mode = 0;
    this.duenos = [];
    this.conductores = [];
    this.servicios = []
    this.configFormGroup(); // 3. Vamos a llamar el metodo de configFormGroup *si este no se llama, mejor dicho no hizo nada*, e iniciamos la variable trySend = false
    this.trySend = false;
  }

  duenosList(){
    this.duenoService.list().subscribe(data => {
      
      this.duenos=data
      console.log(this.duenos);
      
    })
  }

  conductoresList(){
    this.conductorService.list().subscribe(data => {
      
      this.conductores=data
      console.log(this.conductores);
      
    })
  }

  servicioList(){
    this.servicioService.list().subscribe(data => {
      
      this.servicios=data
      console.log(this.servicios);
      
    })
  }

  ngOnInit(): void {
    this.duenosList();
    this.conductoresList();
    this.servicioList();    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.gasto.id = this.activateRoute.snapshot.params.id;
      this.getGasto(this.gasto.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      detalles: [0, [Validators.required, Validators.maxLength(40)]],
      dueno_id: [null, [Validators.required]],
      conductor_id: [null, [Validators.required,]],
      servicio_id: [null, [Validators.required,]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getGasto(id: number) {
    this.gastosService.view(id).subscribe((data) => {
      this.gasto = data;
    });
  }

  create() {
    this.gastosService.create(this.gasto).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado exitosamente", "success");
      this.router.navigate(["gastos/list"]);
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
    if (!this.gasto.id) {
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
    updateData.id = this.gasto.id;

    this.gastosService.update(updateData).subscribe({
      next: (data) => {
        Swal.fire("Éxito", "Vehículo actualizado exitosamente", "success");
        this.router.navigate(["/gastos/list"]);
      },
      error: (error) => {
        Swal.fire("Error", "No se pudo actualizar el vehículo", "error");
        console.error("Error al actualizar:", error);
      },
    });
  }
}
