import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Turno } from "src/app/models/turno/turno.model";
import { TurnoService } from "src/app/services/turnos/turnos.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  turno: Turno;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private TurnoService: TurnoService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.turno = {
      id: 0,
      fecha_inicio: "",
      fecha_fin: "",
      conductor_id: 0
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
      this.turno.id = this.activateRoute.snapshot.params.id;
      this.getTurno(this.turno.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      fecha_inicio: [
        "",
        [
          Validators.required
        ],
      ],
      fecha_fin: [
        "",
        [
          Validators.required
        ],
      ],
      conductor_id: [
        "",
        [
          Validators.required,
          Validators.min(1), // `unsigned`
        ],
      ],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getTurno(id: number) {
    this.TurnoService.view(id).subscribe((data) => {
      this.turno = data;
    });
  }

  create() {
    if(this.theFormGroup.invalid) {
      this.trySend = true
      Swal.fire("Error en el formulario", " Ingrese correctamente los datos solicitados", "error")
      return
    }
    console.log(this.turno);
    
    this.TurnoService.create(this.turno
    ).subscribe(data=> {
      Swal.fire("Creado", "Se ha creado el turno existosamente", "success")
      this.router.navigate(["turnos/list"]) //Aqui me muevo para el theaters list 
    })
  }

  update() {
    this.TurnoService
      .update(this.turno)
      .subscribe((data) => {
        Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
        this.router.navigate(["TurnosConductores/list"]);
      });
  }
}
