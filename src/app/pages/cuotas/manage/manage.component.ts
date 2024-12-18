import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Contrato } from "src/app/models/contrato/contrato.model";
import { Cuota } from "src/app/models/cuota/cuota.model";
import { ContratoService } from "src/app/services/contratos/contratos.service";
import { CuotaService } from "src/app/services/cuotas/cuotas.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  cuota: Cuota;
  contratos: Contrato[];
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private cuotasService: CuotaService,
    private contratoService: ContratoService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.cuota = {
      id: 0,
      monto: 0,
      intereses: 0,
      numero: 0,
      contrato_id: {
        id: null,
        fecha: "",
        distancia_total: 0,
        costo_total: 0,
        cliente_id: null
      },
    };
    this.mode = 0;
    this.contratos = []
    this.configFormGroup(); // 3. Vamos a llamar el metodo de configFormGroup *si este no se llama, mejor dicho no hizo nada*, e iniciamos la variable trySend = false
    this.trySend = false;
  }

  contratosList(){
    this.contratoService.list().subscribe(data => {
      
      this.contratos=data
      console.log(this.contratos);
      
    })
  }


  ngOnInit(): void {
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
      this.cuota.id = this.activateRoute.snapshot.params.id;
      this.getCuota(this.cuota.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      monto: [0, [Validators.required, Validators.min(1)]],
      numero: [0, [Validators.required, Validators.min(1)]],
      intereses: [
        0,
        [Validators.required, Validators.min(0)],
      ],
      contrato_id: [null, [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getCuota(id: number) {
    this.cuotasService.view(id).subscribe((data) => {
      this.cuota = data;
    });
  }

  create() {
    this.cuotasService.create(this.cuota).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado exitosamente", "success");
      this.router.navigate(["cuotas/list"]);
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
    if (!this.cuota.id) {
      Swal.fire(
        "Error",
        "No se pudo encontrar el vehículo para actualizar",
        "error"
      );
      return;
    }

    // Obtiene los valores del formulario
    const updatedData = this.theFormGroup.value;

    // Asegura que el id esté presente en el objeto de actualización
    updatedData.id = this.cuota.id;

    this.cuotasService.update(updatedData).subscribe({
      next: (data) => {
        Swal.fire("Éxito", "Cuota actualizado exitosamente", "success");
        this.router.navigate(["/cuotas/list"]);
      },
      error: (error) => {
        Swal.fire("Error", "No se pudo actualizar la cuota", "error");
        console.error("Error al actualizar:", error);
      },
    });
  }
}
