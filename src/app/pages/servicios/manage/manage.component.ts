import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Administrador } from "src/app/models/administrador/administrador.model";
import { Servicio } from "src/app/models/servicio/servicio.model";
import { AdministradorService } from "src/app/services/administradores/administradores.service";
import { ServicioService } from "src/app/services/servicios/servicios.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  servicio: Servicio;
  administradores: Administrador[];
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private servicioService: ServicioService,
    private administradorService: AdministradorService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.servicio = {
      id: 0,
      fecha: "",
      descripcion: "",
      administrador_id: {
        id: null,
        usuario_id: "",
        tipo: "",
        telefono: ""
      },
    };
    this.mode = 0;
    this.administradores = [];
    this.configFormGroup(); // 3. Vamos a llamar el metodo de configFormGroup *si este no se llama, mejor dicho no hizo nada*, e iniciamos la variable trySend = false
    this.trySend = false;
  }

  administradoressList(){
    this.administradorService.list().subscribe(data => {
      
      this.administradores=data
      console.log(this.administradores);
      
    })
  }

  ngOnInit(): void {
    this.administradoressList();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.servicio.id = this.activateRoute.snapshot.params.id;
      this.getservicio(this.servicio.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      fecha: ["", [Validators.required]],
      descripcion: [
        "",
        [
          Validators.required, // Campo obligatorio
          Validators.pattern(/^[a-zA-Z0-9 _\-]+$/), // `alphaNum` con espacio, guion bajo y guion permitidos
        ],
      ],
      administrador_id: [
        null,
        [
          Validators.required
        ],
      ],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getservicio(id: number) {
    this.servicioService.view(id).subscribe((data) => {
      this.servicio = data;
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
    
      this.servicioService.create(this.servicio).subscribe({
        next: (data) => {
          Swal.fire("Éxito", "Se ha creado el servicio exitosamente", "success");
          this.router.navigate(["servicios/list"]);
        },
        error: (error) => {
          if (error.status === 409) {
            Swal.fire(
              "Error",
              error.error.error || "El administrador ya está asignado a otro servicio.",
              "error"
            );
          } else {
            Swal.fire(
              "Error",
              "Ocurrió un problema al crear el servicio.",
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
    
      if (!this.servicio.id) {
        Swal.fire(
          "Error",
          "No se pudo encontrar el servicio para actualizar.",
          "error"
        );
        return;
      }
    
      const updatedData = this.theFormGroup.value;
      updatedData.id = this.servicio.id;
    
      this.servicioService.update(updatedData).subscribe({
        next: (data) => {
          Swal.fire(
            "Éxito",
            "Servicio actualizado exitosamente.",
            "success"
          );
          this.router.navigate(["servicios/list"]);
        },
        error: (error) => {
          if (error.status === 409) {
            Swal.fire(
              "Error",
              error.error.error || "El administrador ya está asignado a otro servicio.",
              "error"
            );
          } else {
            Swal.fire(
              "Error",
              "No se pudo actualizar el servicio.",
              "error"
            );
            console.error("Error en la actualización:", error);
          }
        },
      });
    }
}
