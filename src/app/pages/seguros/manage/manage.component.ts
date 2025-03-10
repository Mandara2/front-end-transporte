import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Seguro } from "src/app/models/seguro/seguro.model";
import { Vehiculo } from "src/app/models/vehiculo/vehiculo.model";
import { SeguroService } from "src/app/services/seguros/seguros.service";
import { VehiculoService } from "src/app/services/vehiculos/vehiculos.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  seguro: Seguro;
  vehiculos: Vehiculo[]
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private seguroService: SeguroService,
    private vehiculoService: VehiculoService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.seguro = {
      id: 0,
      fecha_inicio: "",
      fecha_fin: "",
      compania_aseguradora: "",
      vehiculo_id: {
        id: null,
        matricula: "",
        modelo: "",
        capacidad_carga: 0,
        tipo_carga: ""
      },
    };
    this.mode = 0;
    this.vehiculos = []
    this.configFormGroup(); // 3. Vamos a llamar el metodo de configFormGroup *si este no se llama, mejor dicho no hizo nada*, e iniciamos la variable trySend = false
    this.trySend = false;
  }

  vehiculosList(){
    this.vehiculoService.list().subscribe(data => {
      
      this.vehiculos=data
      console.log(this.vehiculos);
      
    })
  }

  ngOnInit(): void {
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
      this.seguro.id = this.activateRoute.snapshot.params.id;
      this.getseguro(this.seguro.id);
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
      fecha_fin: [
        "",
        [
          Validators.required, // Campo obligatorio
        ],
      ],
      compania_aseguradora: [
        "",
        [
          Validators.pattern(/^[a-zA-Z0-9 ]*$/), // `alphaNum` con espacios permitidos
        ],
      ],
      vehiculo_id: [
        null,
        [
          Validators.required // Campo obligatorio // Asegura que el ID sea positivo
        ],
      ],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getseguro(id: number) {
    this.seguroService.view(id).subscribe((data) => {
      this.seguro = data;
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
    console.log(this.seguro);

    this.seguroService.create(this.seguro).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado el seguro existosamente", "success");
      this.router.navigate(["seguros/list"]); //Aqui me muevo para el theaters list
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
    if (!this.seguro.id) {
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
    updateData.id = this.seguro.id;

    this.seguroService.update(updateData).subscribe({
      next: (data) => {
        Swal.fire("Éxito", "Vehículo actualizado exitosamente", "success");
        this.router.navigate(["/seguros/list"]);
      },
      error: (error) => {
        Swal.fire("Error", "No se pudo actualizar el vehículo", "error");
        console.error("Error al actualizar:", error);
      },
    });
  }
}
