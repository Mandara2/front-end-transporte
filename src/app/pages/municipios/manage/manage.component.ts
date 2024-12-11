import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Municipio } from "src/app/models/municipio/municipio.model";
import { MunicipioService } from "src/app/services/municipios/municipios.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  municipio: Municipio;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private municipioService: MunicipioService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.municipio = {
      id: 0,
      nombre: "",
      codigo_postal: "",
      departamento_id: 0,
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
      this.municipio.id = this.activateRoute.snapshot.params.id;
      this.getmunicipio(this.municipio.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      nombre: [
        "",
        [
          Validators.required, // Campo obligatorio
          Validators.pattern(/^[a-zA-Z0-9 ]+$/), // Letras, números y espacios
        ],
      ],
      codigo_postal: [
        "",
        [
          Validators.required, // Campo obligatorio
          Validators.pattern(/^[0-9]+$/), // Solo números
        ],
      ],
      departamento_id: [
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

  getmunicipio(id: number) {
    this.municipioService.view(id).subscribe((data) => {
      this.municipio = data;
    });
  }

  create() {
    if(this.theFormGroup.invalid) {
      this.trySend = true
      Swal.fire("Error en el formulario", " Ingrese correctamente los datos solicitados", "error")
      return
    }
    console.log(this.municipio);
    
    this.municipioService.create(this.municipio
    ).subscribe(data=> {
      Swal.fire("Creado", "Se ha creado el municipio existosamente", "success")
      this.router.navigate(["municipios/list"]) //Aqui me muevo para el theaters list 
    })
  }

  update() {
    this.municipioService
      .update(this.municipio)
      .subscribe((data) => {
        Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
        this.router.navigate(["municipiosConductores/list"]);
      });
  }
}
