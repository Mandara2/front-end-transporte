import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Restaurante } from "src/app/models/restaurante/restaurante.model";
import { RestauranteService } from "src/app/services/restaurantes/restaurantes.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  restaurante: Restaurante;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private restauranteService: RestauranteService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.restaurante = {
      id: 0,
      nombre: "",
      ubicacion: "",
      servicio_id: 0
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
      this.restaurante.id = this.activateRoute.snapshot.params.id;
      this.getrestaurante(this.restaurante.id);
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
      ubicacion: [
        "",
        [
          Validators.required, // Campo obligatorio
          Validators.pattern(/^[a-zA-Z0-9 ]+$/), // Letras, números y espacios
        ],
      ],
      servicio_id: [
        "",
        [
          Validators.required, // Campo obligatorio
          Validators.min(1), // Asegura que sea un número positivo
        ],
      ],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getrestaurante(id: number) {
    this.restauranteService.view(id).subscribe((data) => {
      this.restaurante = data;
    });
  }

  create() {
    if(this.theFormGroup.invalid) {
      this.trySend = true
      Swal.fire("Error en el formulario", " Ingrese correctamente los datos solicitados", "error")
      return
    }
    console.log(this.restaurante);
    
    this.restauranteService.create(this.restaurante
    ).subscribe(data=> {
      Swal.fire("Creado", "Se ha creado el restaurante existosamente", "success")
      this.router.navigate(["restaurantes/list"]) //Aqui me muevo para el theaters list 
    })
  }

  update() {
    this.restauranteService
      .update(this.restaurante)
      .subscribe((data) => {
        Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
        this.router.navigate(["restaurantesConductores/list"]);
      });
  }
}
