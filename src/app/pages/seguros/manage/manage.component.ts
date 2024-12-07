import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Seguro } from "src/app/models/seguro/seguro.model";
import { SeguroService } from "src/app/services/seguros/seguros.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  seguro: Seguro;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private seguroService: SeguroService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.seguro = {
      id: 0,
      fecha_inicio: "",
      fecha_fin: "",
      compania_aseguradora: "",
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
      this.seguro.id = this.activateRoute.snapshot.params.id;
      this.getseguro(this.seguro.id);
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
          Validators.required, // Campo obligatorio
        ],
      ],
      compania_aseguradora: [
        "",
        [
          Validators.pattern(/^[a-zA-Z0-9 ]*$/), // `alphaNum` con espacios permitidos
        ],
      ],
      vehiculo_id: [
        "",
        [
          Validators.required, // Campo obligatorio
          Validators.min(1), // Asegura que el ID sea positivo
        ],
      ],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getseguro(id: number) {
    this.seguroService.view(id).subscribe((data) => {
      this.seguro = data;
    });
  }

  create() {
    if(this.theFormGroup.invalid) {
      this.trySend = true
      Swal.fire("Error en el formulario", " Ingrese correctamente los datos solicitados", "error")
      return
    }
    console.log(this.seguro);
    
    this.seguroService.create(this.seguro
    ).subscribe(data=> {
      Swal.fire("Creado", "Se ha creado el seguro existosamente", "success")
      this.router.navigate(["seguros/list"]) //Aqui me muevo para el theaters list 
    })
  }

  update() {
    this.seguroService
      .update(this.seguro)
      .subscribe((data) => {
        Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
        this.router.navigate(["segurosConductores/list"]);
      });
  }
}
