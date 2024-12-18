import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Restaurante } from "src/app/models/restaurante/restaurante.model";
import { Servicio } from "src/app/models/servicio/servicio.model";
import { RestauranteService } from "src/app/services/restaurantes/restaurantes.service";
import { ServicioService } from "src/app/services/servicios/servicios.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  restaurante: Restaurante;
  servicios: Servicio[];
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private restauranteService: RestauranteService,
    private servicioService: ServicioService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.restaurante = {
      id: 0,
      nombre: "",
      ubicacion: "",
      servicio_id: {
        id: null,
        fecha: "",
        descripcion: "",
        administrador_id: null
      },
    };
    this.mode = 0;
    this.servicios = [];
    this.configFormGroup(); // 3. Vamos a llamar el metodo de configFormGroup *si este no se llama, mejor dicho no hizo nada*, e iniciamos la variable trySend = false
    this.trySend = false;
  }

  serviciosList(){
    this.servicioService.list().subscribe(data => {
      
      this.servicios=data
      console.log(this.servicios);
      
    })
  }

  ngOnInit(): void {
    this.serviciosList()
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
        null,
        [
          Validators.required, // Campo obligatorio
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
      if (this.theFormGroup.invalid) {
        this.trySend = true;
        Swal.fire(
          "Formulario inválido",
          "Por favor complete correctamente todos los campos.",
          "error"
        );
        return;
      }
    
      this.restauranteService.create(this.restaurante).subscribe({
        next: (data) => {
          Swal.fire("Éxito", "Se ha creado el restaurante exitosamente", "success");
          this.router.navigate(["restaurantes/list"]);
        },
        error: (error) => {
          if (error.status === 409) {
            Swal.fire(
              "Error",
              error.error.error || "El servicio ya está asignado a restaurante.",
              "error"
            );
          } else {
            Swal.fire(
              "Error",
              "Ocurrió un problema al crear el restaurante.",
              "error"
            );
            console.error("Error en la creación:", error);
          }
        },
      });
    }

  update() {
      if (this.theFormGroup.invalid) {
        this.trySend = true;
        Swal.fire(
          "Formulario inválido",
          "Ingrese correctamente los datos.",
          "error"
        );
        return;
      }
    
      if (!this.restaurante.id) {
        Swal.fire(
          "Error",
          "No se pudo encontrar el restaurante para actualizar.",
          "error"
        );
        return;
      }
    
      const updatedData = this.theFormGroup.value;
      updatedData.id = this.restaurante.id;
    
      this.restauranteService.update(updatedData).subscribe({
        next: (data) => {
          Swal.fire(
            "Éxito",
            "Restaurante actualizado exitosamente.",
            "success"
          );
          this.router.navigate(["restaurantes/list"]);
        },
        error: (error) => {
          if (error.status === 409) {
            Swal.fire(
              "Error",
              error.error.error || "El servicio ya está asignado a otro restaurante.",
              "error"
            );
          } else {
            Swal.fire(
              "Error",
              "No se pudo actualizar el restaurante.",
              "error"
            );
            console.error("Error en la actualización:", error);
          }
        },
      });
    }
}
