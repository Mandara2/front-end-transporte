import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DirListaOrden } from "src/app/models/dirListaOrden/dir-lista-orden.model";
import { Lote } from "src/app/models/lote/lote.model";
import { DirListaOrdenService } from "src/app/services/dirListaOrden/dir-lista-orden.service";
import { LoteService } from "src/app/services/lotes/lotes.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  lote: Lote;
  dirListaOrdenes: DirListaOrden[];
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private loteService: LoteService,
    private dirListaOrdenService: DirListaOrdenService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.lote = {
      id: 0,
      peso: 0,
      volumen: 0,
      dir_lista_orden_id: {
        id: null,
        orden: 0,
        descripcion: "",
        ruta_id: null,
        direccion_id: null
      },
      
      
    };
    this.mode = 0;
    this.dirListaOrdenes = [];
    this.configFormGroup(); // 3. Vamos a llamar el metodo de configFormGroup *si este no se llama, mejor dicho no hizo nada*, e iniciamos la variable trySend = false
    this.trySend = false;
  }

  dirListaOrdenesList(){
    this.dirListaOrdenService.list().subscribe(data => {
      
      this.dirListaOrdenes=data
      console.log(this.dirListaOrdenes);
      
    })
  }

  ngOnInit(): void {
    this.dirListaOrdenesList();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.lote.id = this.activateRoute.snapshot.params.id;
      this.getlote(this.lote.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      peso: [
        "",
        [
          Validators.required, // Campo obligatorio
          Validators.min(0), // Valor no puede ser negativo
        ],
      ],
      volumen: [
        "",
        [
          Validators.required, // Campo obligatorio
          Validators.min(0), // Valor no puede ser negativo
        ],
      ],
      dir_lista_orden_id: [
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

  getlote(id: number) {
    this.loteService.view(id).subscribe((data) => {
      this.lote = data;
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
    
      this.loteService.create(this.lote).subscribe({
        next: (data) => {
          Swal.fire("Éxito", "Se ha creado el lote", "success");
          this.router.navigate(["lotes/list"]);
        },
        error: (error) => {
          if (error.status === 409) {
            Swal.fire(
              "Error",
              error.error.error || "El oprden ya está asignado a otro lote.",
              "error"
            );
          } else {
            Swal.fire(
              "Error",
              "Ocurrió un problema al crear el lote.",
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
    
      if (!this.lote.id) {
        Swal.fire(
          "Error",
          "No se pudo encontrar el centro de distribución para actualizar.",
          "error"
        );
        return;
      }
    
      const updatedData = this.theFormGroup.value;
      updatedData.id = this.lote.id;
    
      this.loteService.update(updatedData).subscribe({
        next: (data) => {
          Swal.fire(
            "Éxito",
            "Centro de distribución actualizado exitosamente.",
            "success"
          );
          this.router.navigate(["centrosDistribucion/list"]);
        },
        error: (error) => {
          if (error.status === 409) {
            Swal.fire(
              "Error",
              error.error.error || "La dirección ya está asignada a otro centro de distribución.",
              "error"
            );
          } else {
            Swal.fire(
              "Error",
              "No se pudo actualizar el centro de distribución.",
              "error"
            );
            console.error("Error en la actualización:", error);
          }
        },
      });
    }
}
