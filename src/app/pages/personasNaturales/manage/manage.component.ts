import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Cliente } from "src/app/models/cliente/cliente.model";
import { PersonaNatural } from "src/app/models/personaNatural/persona-natural.model";
import { PersonaNaturalService } from "src/app/services/personasNaturales/personas-naturales.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  personaNatural: PersonaNatural;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private personasNaturalesService: PersonaNaturalService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.personaNatural = {
      id: 0,
      usuario_id: "",
      identificacion: "",
      tipo_documento: "",
      fecha_nacimiento: new Date(),
      cliente: new Cliente(),
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
      this.personaNatural.id = this.activateRoute.snapshot.params.id;
      this.getPersonaNatural(this.personaNatural.id);
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

  getPersonaNatural(id: number) {
    this.personasNaturalesService.view(id).subscribe((data) => {
      this.personaNatural = data;
    });
  }

  create() {
    this.personasNaturalesService
      .create(this.personaNatural)
      .subscribe((data) => {
        Swal.fire("Creado", "Se ha creado exitosamente", "success");
        this.router.navigate(["personaNaturals/list"]);
      });
  }
  update() {
    this.personasNaturalesService
      .update(this.personaNatural)
      .subscribe((data) => {
        Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
        this.router.navigate(["personaNaturals/list"]);
      });
  }
}
