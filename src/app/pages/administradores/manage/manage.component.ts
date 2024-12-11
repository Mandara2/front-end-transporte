import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { Administrador } from "../../../models/administrador/administrador.model";
import { AdministradorService } from "src/app/services/administradores/administradores.service";

/* 
1. INYECTAR FORMBUILDER: ESTABLECE LAS LEYES 

2. DECLARAMOS theFromGroup Y EL trySend: LA PRIMERA ES EL POLICIA QUE HACE CUMPLIR LA LEYES, LA SEGUNDA
NOS VA A DECIR SI EL USUARIO YA INTENTÓ ACCEDER

3. LLAMAMOS EL METODO DE this.cofigFormlGroup EN EL CONSTRUCTOR E INICILIZAR trySend en false

4. CREAR EL METODO configFormGroup Y ESTABLECER LAS RELGAS (ESTE ES SIMILAR AL VALIDATOR DE ADONIS PERO EN METODO)
BUSCAR EN LA DOCUMENTACION DE "VALIDATORS ANGULAR"

5. DEFINIR EL METODO PPARA OBTENER EL FORMGROUP getTheFormGroup

6. CREAMOS LA ETIQUETA TIPO FORM Y HACEMOS REFERENCIA AL FORMGROUP

7. CADA UNO DE LOS TIPO INPUT O SELECT DEBEN DE TENER UN FORMCONTROLNAME

8. CONFIGURAMOS EL HTML PARA CONFIGURAR LA VISUALIZACION DE LAS ALERTAS

9. IMPORTAMOS  ReactiveFormsModulo


PARA RELACIONES



 */

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  administrador: Administrador;
  //Si mode es igual 1 --> view, mode=2 --> create, mode=3 --> update
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  constructor(
    private administradorService: AdministradorService,
    private router: Router, //Este es el que me ayuda a moverme entre las paginas
    private activateRoute: ActivatedRoute, //toma foto de la URl para sacar informacion de ella
    private theFormBuilder: FormBuilder
  ) {
    this.administrador = { id: 0, usuario_id: "", tipo: "", telefono: "" };
    this.mode = 0;
    this.configFormGroup();
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
      this.administrador.id = this.activateRoute.snapshot.params.id;
      this.getAdministrador(this.administrador.id);
    }
  }
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      usuario_id: [0, [Validators.required, Validators.minLength(1)]], //PARAMETROS EN ORDEN: VALOR POR DEFECTO, REQUEIRDO Y RANGO
      tipo: [0, [Validators.required, Validators.maxLength(20)]],
      telefono: [
        0,
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(12),
          Validators.pattern(/^[0-9\-]+$/),
        ],
      ],
    });
  }
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getAdministrador(id: number) {
    this.administradorService.view(id).subscribe((data) => {
      this.administrador = data;
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Error en el formulario",
        "ingrese correctamente los datos ",
        "error"
      );
      return;
    }
    this.administradorService.create(this.administrador).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado el administrador existosamente", "success");
      this.router.navigate(["administradores/list"]); //Aqui me muevo para el theaters list
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Formulario invalido",
        "Ingrese correctamente los datos",
        "error"
      );
      return;
    }

    // Verifica si el vehículo tiene un id antes de realizar la actualización
    if (!this.administrador.id) {
      Swal.fire(
        "Error",
        "No se pudo encontrar el administrador para actualizar",
        "error"
      );
      return;
    }

    // Obtiene los valores del formulario
    const updatedData = this.theFormGroup.value;

    // Asegura que el id esté presente en el objeto de actualización
    updatedData.id = this.administrador.id;

    this.administradorService.update(updatedData).subscribe({
      next: (data) => {
        Swal.fire("Éxito", "Administrador actualizado exitosamente", "success");
        this.router.navigate(["/administradores/list"]);
      },
      error: (error) => {
        Swal.fire("Error", "No se pudo actualizar el administrador", "error");
        console.error("Error al actualizar:", error);
      },
    });
  }
}
