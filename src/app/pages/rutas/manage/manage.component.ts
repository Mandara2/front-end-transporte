import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Contrato } from "src/app/models/contrato/contrato.model";
import { Ruta } from "src/app/models/ruta/ruta.model";
import { VehiculoConductor } from "src/app/models/vehiculoConductor/vehiculo-conductor.model";
import { ContratoService } from "src/app/services/contratos/contratos.service";
import { RutaService } from "src/app/services/rutas/rutas.service";
import { VehiculoConductorService } from "src/app/services/vehiculosConductores/vehiculos-conductores.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  ruta: Ruta;
  contratos: Contrato[];
  vehiculosConductores: VehiculoConductor[];
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private rutaService: RutaService,
    private contratoService: ContratoService,
    private vehiculoConductorService: VehiculoConductorService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.ruta = {
      id: 0,
      punto_inicio: "",
      punto_destino: "",
      distancia: 0,
      fecha_entrega: "",
      contrato_id: {
        id: null,
        fecha: "",
        distancia_total: 0,
        costo_total: 0,
        cliente_id: null
      },
      vehiculo_conductor_id: {
        id: null,
        fecha_inicio: "",
        fecha_fin: "",
        vehiculo_id: null,
        conductor_id: null
      },
    };
    this.mode = 0;
    this.contratos = [];
    this.vehiculosConductores = [];
    this.configFormGroup(); // 3. Vamos a llamar el metodo de configFormGroup *si este no se llama, mejor dicho no hizo nada*, e iniciamos la variable trySend = false
    this.trySend = false;

  }

  contratosList(){
    this.contratoService.list().subscribe(data => {
      
      this.contratos=data
      console.log(this.contratos);
      
    })
  }

  vehiculosConductoresList(){
    this.vehiculoConductorService.list().subscribe(data => {
      
      this.vehiculosConductores=data
      console.log(this.vehiculosConductores);
      
    })
  }


  ngOnInit(): void {
    this.vehiculosConductoresList();
    this.contratosList();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.ruta.id = this.activateRoute.snapshot.params.id;
      this.getruta(this.ruta.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      punto_inicio: [
        "",
        [
          Validators.required, // Campo obligatorio
        ],
      ],
      punto_destino: [
        "",
        [
          Validators.required, // Campo obligatorio
        ],
      ],
      distancia: [
        "",
        [
          Validators.required, // Campo obligatorio
          Validators.min(0), // Solo valores positivos
        ],
      ],
      fecha_entrega: [
        "",
        [
          Validators.required, // Campo obligatorio
        ],
      ],
      contrato_id: [
        null,
        [
          Validators.required, // Campo obligatorio
                  ],
      ],
      vehiculo_conductor_id: [
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

  getruta(id: number) {
    this.rutaService.view(id).subscribe((data) => {
      this.ruta = data;
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
    console.log(this.ruta);

    this.rutaService.create(this.ruta).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado la ruta existosamente", "success");
      this.router.navigate(["rutas/list"]); //Aqui me muevo para el theaters list
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
    if (!this.ruta.id) {
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
    updateData.id = this.ruta.id;

    this.rutaService.update(updateData).subscribe({
      next: (data) => {
        Swal.fire("Éxito", "Vehículo actualizado exitosamente", "success");
        this.router.navigate(["/rutas/list"]);
      },
      error: (error) => {
        Swal.fire("Error", "No se pudo actualizar el vehículo", "error");
        console.error("Error al actualizar:", error);
      },
    });
  }
}
