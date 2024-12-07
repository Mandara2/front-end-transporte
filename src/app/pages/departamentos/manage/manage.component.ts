import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Departamento } from "src/app/models/departamento/departamento.model";
import { DepartamentoService } from "src/app/services/departamentos/departamentos.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  departamento: Departamento;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private departamentosService: DepartamentoService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.departamento = {
      id: 0,
      nombre: "",
      region: "",
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
      this.departamento.id = this.activateRoute.snapshot.params.id;
      this.getDepartamento(this.departamento.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      nombre: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      ],
      region: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getDepartamento(id: number) {
    this.departamentosService.view(id).subscribe((data) => {
      this.departamento = data;
    });
  }

  create() {
    this.departamentosService.create(this.departamento).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado exitosamente", "success");
      this.router.navigate(["departamentos/list"]);
    });
  }
  update() {
    this.departamentosService.update(this.departamento).subscribe((data) => {
      Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
      this.router.navigate(["departamentos/list"]);
    });
  }
}
