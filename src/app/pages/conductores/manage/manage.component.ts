import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Conductor } from "src/app/models/conductor/conductor.model";
import { ConductorService } from "src/app/services/conductores/conductores.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  conductor: Conductor;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private conductoresService: ConductorService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.conductor = {
      id: 0,
      usuario_id: "",
      telefono: "",
      numero_licencia: "",
      fecha_vencimiento_licencia: "",
      fecha_nacimiento: ""
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
      this.conductor.id = this.activateRoute.snapshot.params.id;
      this.getConductor(this.conductor.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      usuario_id: [
        0,
        [Validators.required],
      ],
      telefono: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^[\d\-]+$/) ]],
      numero_licencia:["",[Validators.required, Validators.pattern(/^[\d\-]+$/) ]],
      fecha_vencimiento_licencia:["",[Validators.required,  Validators.pattern(/^\d{2,4}-\d{2}-\d{2}$/)]],
      fecha_nacimiento:["",[Validators.required,  Validators.pattern(/^\d{2,4}-\d{2}-\d{2}$/)]]


    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getConductor(id: number) {
    this.conductoresService.view(id).subscribe((data) => {
      this.conductor = data;
    });
  }

  create() {
    this.conductoresService.create(this.conductor).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado exitosamente", "success");
      this.router.navigate(["conductores/list"]);
    });
  }
  update() {
    this.conductoresService.update(this.conductor).subscribe((data) => {
      Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
      this.router.navigate(["conductores/list"]);
    });
  }
}
