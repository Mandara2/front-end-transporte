import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Cliente } from "src/app/models/cliente/cliente.model";
import { Empresa } from "src/app/models/empresa/empresa.model";
import { PersonaNatural } from "src/app/models/personaNatural/persona-natural.model";
import { EmpresaService } from "src/app/services/empresas/empresas.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  empresa: Empresa;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private empresasService: EmpresaService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.empresa = {
      id: 0,
      nit: "",
      direccion_fiscal: "",
      cliente: new Cliente(),
      persona_natural: new PersonaNatural(),
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
      this.empresa.id = this.activateRoute.snapshot.params.id;
      this.getEmpresa(this.empresa.id);
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

  getEmpresa(id: number) {
    this.empresasService.view(id).subscribe((data) => {
      this.empresa = data;
    });
  }

  create() {
    this.empresasService.create(this.empresa).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado exitosamente", "success");
      this.router.navigate(["empresas/list"]);
    });
  }
  update() {
    this.empresasService.update(this.empresa).subscribe((data) => {
      Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
      this.router.navigate(["empresas/list"]);
    });
  }
}
