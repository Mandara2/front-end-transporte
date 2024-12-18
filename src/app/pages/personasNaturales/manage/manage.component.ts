import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Cliente } from "src/app/models/cliente/cliente.model";
import { PersonaNatural } from "src/app/models/personaNatural/persona-natural.model";
import { ClienteService } from "src/app/services/cliente/cliente.service";
import { PersonaNaturalService } from "src/app/services/personasNaturales/personas-naturales.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  personaNatural: PersonaNatural;
  clientes: Cliente[]
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private personaNaturalService: PersonaNaturalService,
    private clienteService: ClienteService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.personaNatural = {
      id: 0,
      usuario_id: "",
      identificacion: "",
      tipo_documento: "",
      fecha_nacimiento: "",
      cliente_id: {
        id: null,
        telefono: "",
        cantidad_pedidos_realizados: 0
      },
     
    };
    this.mode = 0;
    this.clientes = [];
    this.configFormGroup(); // 3. Vamos a llamar el metodo de configFormGroup *si este no se llama, mejor dicho no hizo nada*, e iniciamos la variable trySend = false
    this.trySend = false;
  }

  clientesList(){
    this.clienteService.list().subscribe(data => {
      
      this.clientes=data
      console.log(this.clientes);
      
    })
  }

  ngOnInit(): void {
    this.clientesList();
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
        null,
        [
          Validators.required, // Campo obligatorio
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
      if (this.theFormGroup.invalid) {
        this.trySend = true;
        Swal.fire(
          "Formulario inválido",
          "Por favor complete correctamente todos los campos.",
          "error"
        );
        return;
      }
    
      this.personaNaturalService.create(this.personaNatural).subscribe({
        next: (data) => {
          Swal.fire("Éxito", "Se ha creado la persona exitosamente", "success");
          this.router.navigate(["personasNaturales/list"]);
        },
        error: (error) => {
          if (error.status === 409) {
            Swal.fire(
              "Error",
              error.error.error || "El cliente ya está asignada a otra persona.",
              "error"
            );
          } else {
            Swal.fire(
              "Error",
              "Ocurrió un problema al crear la persona.",
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
    
      if (!this.personaNatural.id) {
        Swal.fire(
          "Error",
          "No se pudo encontrar el centro de distribución para actualizar.",
          "error"
        );
        return;
      }
    
      const updatedData = this.theFormGroup.value;
      updatedData.id = this.personaNatural.id;
    
      this.personaNaturalService.update(updatedData).subscribe({
        next: (data) => {
          Swal.fire(
            "Éxito",
            "Persona actualizado exitosamente.",
            "success"
          );
          this.router.navigate(["personasNaturales/list"]);
        },
        error: (error) => {
          if (error.status === 409) {
            Swal.fire(
              "Error",
              error.error.error || "El cliente ya está asignado a otra persona.",
              "error"
            );
          } else {
            Swal.fire(
              "Error",
              "No se pudo actualizar la persona.",
              "error"
            );
            console.error("Error en la actualización:", error);
          }
        },
      });
    }
}
