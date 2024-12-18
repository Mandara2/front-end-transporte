import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Cliente } from "src/app/models/cliente/cliente.model";
import { Empresa } from "src/app/models/empresa/empresa.model";
import { PersonaNatural } from "src/app/models/personaNatural/persona-natural.model";
import { EmpresaService } from "src/app/services/empresas/empresas.service";
import { PersonaNaturalService } from "src/app/services/personasNaturales/personas-naturales.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  empresa: Empresa;
  personasNaturales: PersonaNatural[];
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private empresasService: EmpresaService,
    private personaNaturalService: PersonaNaturalService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.empresa = {
      id: 0,
      nit: "",
      tipo_empresa: "",
      direccion_fiscal: "",
      cliente_id: 0,
      persona_natural_id: {
        id: null,
        usuario_id: "",
        identificacion: "",
        tipo_documento: "",
        fecha_nacimiento: "",
        cliente_id: null
      },
    };
    this.mode = 0;
    this.personasNaturales = [];
    this.configFormGroup(); // 3. Vamos a llamar el metodo de configFormGroup *si este no se llama, mejor dicho no hizo nada*, e iniciamos la variable trySend = false
    this.trySend = false;
  }

  personasNaturalesList(){
    this.personaNaturalService.list().subscribe(data => {
      
      this.personasNaturales=data
      console.log(this.personasNaturales);
      
    })
  }

  ngOnInit(): void {
    this.personasNaturalesList();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.empresa.id = this.activateRoute.snapshot.params.id;
      this.getEmpresa(this.empresa.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      nit: ["", [Validators.required, Validators.pattern(/^[\d\-]+$/)]],
      tipo_empresa: ["", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9 _-]+$/)] ],
      direccion_fiscal: ["", [Validators.minLength(2)]],
      cliente_id: [0, [Validators.required, Validators.min(1)]],
      persona_natural_id: [null, [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getEmpresa(id: number) {
    this.empresasService.view(id).subscribe((data) => {
      this.empresa = data;
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
    
      this.empresasService.create(this.empresa).subscribe({
        next: (data) => {
          Swal.fire("Éxito", "Se ha creado la empresa exitosamente", "success");
          this.router.navigate(["empresas/list"]);
        },
        error: (error) => {
          if (error.status === 409) {
            Swal.fire(
              "Error",
              error.error.error || "La persona natural ya está asignada a otro centro de distribución.",
              "error"
            );
          } else {
            Swal.fire(
              "Error",
              "Ocurrió un problema al crear la empresa.",
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
    
      if (!this.empresa.id) {
        Swal.fire(
          "Error",
          "No se pudo encontrar la empresa para actualizar.",
          "error"
        );
        return;
      }
    
      const updatedData = this.theFormGroup.value;
      updatedData.id = this.empresa.id;
    
      this.empresasService.update(updatedData).subscribe({
        next: (data) => {
          Swal.fire(
            "Éxito",
            "Empresa actualizado exitosamente.",
            "success"
          );
          this.router.navigate(["empresas/list"]);
        },
        error: (error) => {
          if (error.status === 409) {
            Swal.fire(
              "Error",
              error.error.error || "La persona natural ya está asignada a otra empresa.",
              "error"
            );
          } else {
            Swal.fire(
              "Error",
              "No se pudo actualizar la empresa.",
              "error"
            );
            console.error("Error en la actualización:", error);
          }
        },
      });
    }
}
