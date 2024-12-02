import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Cuota } from "src/app/models/cuota/cuota.model";
import { Factura } from "src/app/models/factura/factura.model";
import { Gasto } from "src/app/models/gasto/gasto.model";
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
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.factura = {
      id: 0,
      fecha: new Date(),
      monto: 0,
      estado: "",
      detalles: "",
      cuota: new Cuota(),
      gasto: new Gasto(),
    };
    this.mode = 0;
    this.configFormGroup(); // 3. Vamos a llamar el metodo de configFormGroup *si este no se llama, mejor dicho no hizo nada*, e iniciamos la variable trySend = false
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
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      capacity: [
        0,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      location: ["", [Validators.required, Validators.minLength(2)]],
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
    this.facturasService.update(this.factura).subscribe((data) => {
      Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
      this.router.navigate(["facturas/list"]);
    });
  }
}
