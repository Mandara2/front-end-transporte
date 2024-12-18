import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { log } from "console";
import { Conductor } from "src/app/models/conductor/conductor.model";
import { Dueno } from "src/app/models/dueno/dueno.model";
import { ConductorService } from "src/app/services/conductores/conductores.service";
import { DuenoService } from "src/app/services/duenos/duenos.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  dueno: Dueno;
  conductores: Conductor[];
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private duenosService: DuenoService,
    private conductorService: ConductorService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.dueno = {
      id: 0,
      usuario_id: "",
      telefono: "",
      fecha_nacimiento: "",
      conductor_id: {
        id: null,
        usuario_id:"",
        telefono: "",
        numero_licencia: "",
        fecha_vencimiento_licencia: "",
        fecha_nacimiento: ""
      },
    };
    this.mode = 0;
    this.conductores = []
    this.configFormGroup(); // 3. Vamos a llamar el metodo de configFormGroup *si este no se llama, mejor dicho no hizo nada*, e iniciamos la variable trySend = false
    this.trySend = false;
  }

  conductoresList(){
    this.conductorService.list().subscribe(data => {
      
      this.conductores=data
      console.log(this.conductores);
      
    })
  }

  ngOnInit(): void {
    this.conductoresList();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.dueno.id = this.activateRoute.snapshot.params.id;
      this.getDueno(this.dueno.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      usuario_id: ["", [Validators.required]],
      telefono: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(/^[\d\-]+$/),
        ],
      ],
      fecha_nacimiento: [
        "",
        [Validators.required, Validators.pattern(/^\d{2,4}-\d{2}-\d{2}$/)],
      ],
      conductor_id: [null, [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getDueno(id: number) {
    this.duenosService.view(id).subscribe((data) => {
      console.log(data);
      this.dueno = data;
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
    
      this.duenosService.create(this.dueno).subscribe({
        next: (data) => {
          Swal.fire("Éxito", "Se ha creado el dueño exitosamente", "success");
          this.router.navigate(["duenos/list"]);
        },
        error: (error) => {
          if (error.status === 409) {
            Swal.fire(
              "Error",
              error.error.error || "El conductor ya está asignado.",
              "error"
            );
          } else {
            Swal.fire(
              "Error",
              "Ocurrió un problema al crear el dueño.",
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
    
      if (!this.dueno.id) {
        Swal.fire(
          "Error",
          "No se pudo encontrar el dueño para actualizar.",
          "error"
        );
        return;
      }
    
      const updatedData = this.theFormGroup.value;
      updatedData.id = this.dueno.id;
    
      this.duenosService.update(updatedData).subscribe({
        next: (data) => {
          Swal.fire(
            "Éxito",
            "Centro de distribución actualizado exitosamente.",
            "success"
          );
          this.router.navigate(["duenos/list"]);
        },
        error: (error) => {
          if (error.status === 409) {
            Swal.fire(
              "Error",
              error.error.error || "El conductor ya está asignado.",
              "error"
            );
          } else {
            Swal.fire(
              "Error",
              "No se pudo actualizar el dueño.",
              "error"
            );
            console.error("Error en la actualización:", error);
          }
        },
      });
    }
}
