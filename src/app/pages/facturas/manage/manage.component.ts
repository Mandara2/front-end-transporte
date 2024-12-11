import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Factura } from "src/app/models/factura/factura.model";

import { FacturaService } from "src/app/services/factura/factura.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  factura: Factura;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private facturasService: FacturaService,
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
      cuota_id: 0,
      gasto_id: 0,
    };
    this.mode = 0;
    this.configFormGroup();
    this.trySend = false;
  }

  ngOnInit(): void {
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
      estado: ["", [Validators.required, Validators.minLength(2)]],
      detalles: ["", [Validators.required, Validators.maxLength(40)]],
      cuota_id: [0, [Validators.required, Validators.min(1)]],
      gasto_id: [0, [Validators.required, Validators.min(1)]],
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
    this.facturasService.create(this.factura).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado exitosamente", "success");
      this.router.navigate(["facturas/list"]);
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

    if (!this.factura.id) {
      Swal.fire(
        "Error",
        "No se pudo encontrar el vehículo para actualizar",
        "error"
      );
      return;
    }

    const updateData = { ...this.theFormGroup.value, id: this.factura.id };

    this.facturasService.update(updateData).subscribe({
      next: (data) => {
        Swal.fire("Éxito", "Vehículo actualizado exitosamente", "success");
        this.router.navigate(["/facturas/list"]);
      },
      error: (error) => {
        Swal.fire("Error", "No se pudo actualizar el vehículo", "error");
        console.error("Error al actualizar:", error);
      },
    });
  }
}
