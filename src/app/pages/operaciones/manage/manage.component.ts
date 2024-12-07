import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Operacion } from "src/app/models/operacion/operacion.model";
import { OperacionService } from "src/app/services/operaciones/operaciones.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  operacion: Operacion;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private operacionService: OperacionService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.operacion = {
      id: 0,
      fecha_inicio: "",
      fecha_fin: "",
      municipio_id: 0,
      vehiculo_id: 0
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
      this.operacion.id = this.activateRoute.snapshot.params.id;
      this.getoperacion(this.operacion.id);
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
        ],
      ],
      vehiculo_id: [
        "",
        [
          Validators.required, // Campo obligatorio
          Validators.min(1), // ID debe ser positivo
        ],
      ],
      municipio_id: [
        "",
        [
          Validators.required, // Campo obligatorio
          Validators.min(1), // ID debe ser positivo
        ],
      ],
    });
  }
  
  

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getoperacion(id: number) {
    this.operacionService.view(id).subscribe((data) => {
      this.operacion = data;
    });
  }

  create() {
    if(this.theFormGroup.invalid) {
      this.trySend = true
      Swal.fire("Error en el formulario", " Ingrese correctamente los datos solicitados", "error")
      return
    }
    console.log(this.operacion);
    
    this.operacionService.create(this.operacion
    ).subscribe(data=> {
      Swal.fire("Creado", "Se ha creado el operacion existosamente", "success")
      this.router.navigate(["operaciones/list"]) //Aqui me muevo para el theaters list 
    })
  }

  update() {
    this.operacionService
      .update(this.operacion)
      .subscribe((data) => {
        Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
        this.router.navigate(["operaciones/list"]);
      });
  }
}
