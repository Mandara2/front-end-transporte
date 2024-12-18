import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Hotel } from "src/app/models/hotel/hotel.model";
import { Servicio } from "src/app/models/servicio/servicio.model";
import { HotelService } from "src/app/services/hoteles/hoteles.service";
import { ServicioService } from "src/app/services/servicios/servicios.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  hotel: Hotel;
  servicios: Servicio[];
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private hotelService: HotelService,
    private servicioService: ServicioService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.hotel = {
      id: 0,
      estrellas: 0,
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
    this.serviciosList();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.hotel.id = this.activateRoute.snapshot.params.id;
      this.gethotel(this.hotel.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      estrellas: [
        "",
        [
          Validators.required, // Campo obligatorio
          Validators.min(0), // Valor mínimo permitido
          Validators.max(5), // Valor máximo permitido
        ],
      ],
      nombre: [
        "",
        [
          Validators.required, // Campo obligatorio
          Validators.pattern(/^[a-zA-Z0-9 ]+$/), // Solo letras, números y espacios
        ],
      ],
      ubicacion: [
        "",
        [
          Validators.required, // Campo obligatorio
          Validators.pattern(/^[a-zA-Z0-9 ]+$/), // Solo letras, números y espacios
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

  gethotel(id: number) {
    this.hotelService.view(id).subscribe((data) => {
      this.hotel = data;
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
    
      this.hotelService.create(this.hotel).subscribe({
        next: (data) => {
          Swal.fire("Éxito", "Se ha creado el hotel exitosamente", "success");
          this.router.navigate(["hoteles/list"]);
        },
        error: (error) => {
          if (error.status === 409) {
            Swal.fire(
              "Error",
              error.error.error || "El servicio ya está asignado a otro centro de distribución.",
              "error"
            );
          } else {
            Swal.fire(
              "Error",
              "Ocurrió un problema al crear el hotel.",
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
    
      if (!this.hotel.id) {
        Swal.fire(
          "Error",
          "No se pudo encontrar el centro de distribución para actualizar.",
          "error"
        );
        return;
      }
    
      const updatedData = this.theFormGroup.value;
      updatedData.id = this.hotel.id;
    
      this.hotelService.update(updatedData).subscribe({
        next: (data) => {
          Swal.fire(
            "Éxito",
            "Hotel actualizado exitosamente.",
            "success"
          );
          this.router.navigate(["hoteles/list"]);
        },
        error: (error) => {
          if (error.status === 409) {
            Swal.fire(
              "Error",
              error.error.error || "El servicio ya está asignado a otro centro de distribución.",
              "error"
            );
          } else {
            Swal.fire(
              "Error",
              "No se pudo actualizar el hotel.",
              "error"
            );
            console.error("Error en la actualización:", error);
          }
        },
      });
    }
}
