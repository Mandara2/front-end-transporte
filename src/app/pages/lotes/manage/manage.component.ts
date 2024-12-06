import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Lote } from "src/app/models/lote/lote.model";
import { LoteService } from "src/app/services/lotes/lotes.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  lote: Lote;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private loteService: LoteService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.lote = {
      id: 0,
      peso: 0,
      volumen: 0,
<<<<<<< HEAD
      dis_lista_orden_id: 0
=======
      dir_lista_orden_id: 0,
>>>>>>> 9f720464274cecf0e2e8ba357d2669cf6f29a1a9
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
        "",
        [
          Validators.required, // Campo obligatorio
          Validators.min(0), // ID debe ser positivo
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
    if(this.theFormGroup.invalid) {
      this.trySend = true
      Swal.fire("Error en el formulario", " Ingrese correctamente los datos solicitados", "error")
      return
    }
    console.log(this.lote);
    
    this.loteService.create(this.lote
    ).subscribe(data=> {
      Swal.fire("Creado", "Se ha creado el lote existosamente", "success")
      this.router.navigate(["lotes/list"]) //Aqui me muevo para el theaters list 
    })
  }

  update() {
    this.loteService
      .update(this.lote)
      .subscribe((data) => {
        Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
        this.router.navigate(["lotesConductores/list"]);
      });
  }
}
