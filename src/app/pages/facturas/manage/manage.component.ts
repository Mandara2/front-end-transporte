import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Cuota } from "src/app/models/cuota/cuota.model";

import { Factura } from "src/app/models/factura/factura.model";
import { Gasto } from "src/app/models/gasto/gasto.model";
import { CuotaService } from "src/app/services/cuotas/cuotas.service";

import { FacturaService } from "src/app/services/factura/factura.service";
import { GastoService } from "src/app/services/gastos/gastos.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  factura: Factura;
  cuotas: Cuota[];
  gastos: Gasto[];
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private facturasService: FacturaService,
    private cuotaService: CuotaService,
    private gastoService: GastoService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.factura = {
      id: 0,
      fecha_hora: "",
      monto: 0,
      estado: "",
      detalles: "",
      cuota_id: {
        id:null,
        monto: 0,
        intereses: 0,
        numero: 0,
        contrato_id: null
      },
      gasto_id: {
        id: null,
        detalles: "",
        dueno_id: null,
        conductor_id: null,
        servicio_id: null
      },
    };
    this.mode = 0;
    this.cuotas = [];
    this.gastos = [];
    this.configFormGroup();
    this.trySend = false;
  }

  cuotasList(){
    this.cuotaService.list().subscribe(data => {
      
      this.cuotas=data
      console.log(this.cuotas);
      
    })
  }

  gastosList(){
    this.gastoService.list().subscribe(data => {
      
      this.gastos=data
      console.log(this.gastos);
      
    })
  }


  ngOnInit(): void {
    this.cuotasList();
    this.gastosList();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.factura.id = this.activateRoute.snapshot.params.id;
      this.getFactura(this.factura.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      fecha_hora: [
        "",
        [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
      ],
      monto: [0, [Validators.required, Validators.min(1)]],
      detalles: ["", [Validators.maxLength(40)]],
      cuota_id: [null],
      gasto_id: [null],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getFactura(id: number) {
    this.facturasService.view(id).subscribe((data) => {
      this.factura = data;
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
    
      this.facturasService.create(this.factura).subscribe({
        next: (data) => {
          Swal.fire("Éxito", "Se ha creado la factura exitosamente", "success");
          this.router.navigate(["facturas/list"]);
        },
        error: (error) => {
          if (error.status === 409) {
            Swal.fire(
              "Error",
              error.error.error || "Alguno de los dos campos ya están asignados a otra factura.",
              "error"
            );
          } else {
            Swal.fire(
              "Error",
              "Ocurrió un problema al crear factura.",
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
    
      if (!this.factura.id) {
        Swal.fire(
          "Error",
          "No se pudo encontrar el centro de distribución para actualizar.",
          "error"
        );
        return;
      }
    
      const updatedData = this.theFormGroup.value;
      updatedData.id = this.factura.id;
    
      this.facturasService.update(updatedData).subscribe({
        next: (data) => {
          Swal.fire(
            "Éxito",
            "Factura actualizado exitosamente.",
            "success"
          );
          this.router.navigate(["facturas/list"]);
        },
        error: (error) => {
          if (error.status === 409) {
            Swal.fire(
              "Error",
              error.error.error || "Alguno de los dos campos ya están asignados a otra factura.",
              "error"
            );
          } else {
            Swal.fire(
              "Error",
              "No se pudo actualizar la factura",
              "error"
            );
            console.error("Error en la actualización:", error);
          }
        },
      });
    }
}
