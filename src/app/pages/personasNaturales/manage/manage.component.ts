import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
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
    private personaNaturalService: PersonaNaturalService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.personaNatural = {
      id: 0,
      usuario_id: "",
      identificacion: "",
      tipo_documento: "",
<<<<<<< HEAD
      fecha_nacimiento: new Date(),
      cliente_id:0
=======
      fecha_nacimiento: "",
      cliente_id: 0
>>>>>>> 9f720464274cecf0e2e8ba357d2669cf6f29a1a9
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
      this.getpersonaNatural(this.personaNatural.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      identificacion: [
        "",
        [
          Validators.required, // Campo obligatorio
        ],
      ],
      tipo_documento: [
        "",
        [
          Validators.required, // Campo obligatorio
        ],
      ],
      fecha_nacimiento: [
        "",
        [
          Validators.required, // Campo obligatorio
        ],
      ],
      cliente_id: [
        "",
        [
          Validators.required, // Campo obligatorio
          Validators.min(1), // Número positivo
        ],
      ],
      usuario_id: [
        "",
        [
          Validators.required, // Campo obligatorio
        ],
      ],
    });
  }
  
  

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getpersonaNatural(id: number) {
    this.personaNaturalService.view(id).subscribe((data) => {
      this.personaNatural = data;
    });
  }

  create() {
    if(this.theFormGroup.invalid) {
      this.trySend = true
      Swal.fire("Error en el formulario", " Ingrese correctamente los datos solicitados", "error")
      return
    }
    console.log(this.personaNatural);
    
    this.personaNaturalService.create(this.personaNatural
    ).subscribe(data=> {
      Swal.fire("Creado", "Se ha creado la persona natural existosamente", "success")
      this.router.navigate(["personaNaturales/list"]) //Aqui me muevo para el theaters list 
    })
  }

  update() {
    this.personaNaturalService
      .update(this.personaNatural)
      .subscribe((data) => {
        Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
        this.router.navigate(["personaNaturalsConductores/list"]);
      });
  }
}
