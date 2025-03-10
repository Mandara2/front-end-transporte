import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Departamento } from "src/app/models/departamento/departamento.model";
import { Municipio } from "src/app/models/municipio/municipio.model";
import { DepartamentoService } from "src/app/services/departamentos/departamentos.service";
import { MunicipioService } from "src/app/services/municipios/municipios.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  municipio: Municipio;
  departamentos: Departamento[];
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private municipioService: MunicipioService,
    private departamentoService: DepartamentoService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.municipio = {
      id: 0,
      nombre: "",
      codigo_postal: "",
      departamento_id:{
        id: null,
        nombre: "",
        region: ""
      }
    };
    this.mode = 0;
    this.departamentos=[]
    this.configFormGroup(); // 3. Vamos a llamar el metodo de configFormGroup *si este no se llama, mejor dicho no hizo nada*, e iniciamos la variable trySend = false
    this.trySend = false;
  }

  departamentosList(){
    this.departamentoService.list().subscribe(data => {
      
      this.departamentos=data
      console.log(this.departamentos);
      
    })
  }

  ngOnInit(): void {
    this.departamentosList();
    
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

  getmunicipio(id: number) {
    this.municipioService.view(id).subscribe((data) => {
      this.municipio = data;
    });
  }

  create() {
    console.log(JSON.stringify(this.municipio));
    
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Error en el formulario",
        " Ingrese correctamente los datos solicitados",
        "error"
      );
      return;
    }
  
    // Forzar conversión a número antes de enviar
    console.log(this.municipio.departamento_id);
  
    this.municipioService.create(this.municipio).subscribe(() => {
      Swal.fire("Creado", "Se ha creado el municipio exitosamente", "success");
      this.router.navigate(["municipios/list"]);
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
    if (!this.municipio.id) {
      Swal.fire(
        "Error",
        "No se pudo encontrar el vehículo para actualizar",
        "error"
      );
      return;
    }

    // Obtiene los valores del formulario
    const updateData = this.theFormGroup.value;

    // Asegura que el id esté presente en el objeto de actualización
    updateData.id = this.municipio.id;

    this.municipioService.update(updateData).subscribe({
      next: (data) => {
        Swal.fire("Éxito", "Vehículo actualizado exitosamente", "success");
        this.router.navigate(["/municipios/list"]);
      },
      error: (error) => {
        Swal.fire("Error", "No se pudo actualizar el vehículo", "error");
        console.error("Error al actualizar:", error);
      },
    });
  }
  
  
}
