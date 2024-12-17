import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Hotel } from "src/app/models/hotel/hotel.model";
import { HotelService } from "src/app/services/hoteles/hoteles.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  hotel: Hotel;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private hotelService: HotelService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.hotel = {
      id: 0,
      estrellas: 0,
      nombre: "",
      ubicacion: "",
      servicio_id: 0,
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
        "",
        [
          Validators.required, // Campo obligatorio
          Validators.min(1), // ID debe ser positivo
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
        "Error en el formulario",
        " Ingrese correctamente los datos solicitados",
        "error"
      );
      return;
    }
    console.log(this.hotel);

    this.hotelService.create(this.hotel).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado el hotel existosamente", "success");
      this.router.navigate(["hoteles/list"]); //Aqui me muevo para el theaters list
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
    if (!this.hotel.id) {
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
    updateData.id = this.hotel.id;

    this.hotelService.update(updateData).subscribe({
      next: (data) => {
        Swal.fire("Éxito", "Vehículo actualizado exitosamente", "success");
        this.router.navigate(["/hoteles/list"]);
      },
      error: (error) => {
        Swal.fire("Error", "No se pudo actualizar el vehículo", "error");
        console.error("Error al actualizar:", error);
      },
    });
  }
}
