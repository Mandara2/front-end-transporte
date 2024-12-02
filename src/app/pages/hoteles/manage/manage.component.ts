import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Hotel } from "src/app/models/hotel/hotel.model";
import { Servicio } from "src/app/models/servicio/servicio.model";
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
    private hotelsService: HotelService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.hotel = {
      id: 0,
      estrellas: 0,
      nombre: "",
      ubicacion: "",
      servicio: new Servicio(),
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
      this.getHotel(this.hotel.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      capacity: [
        0,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      location: ["", [Validators.required, Validators.minLength(2)]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getHotel(id: number) {
    this.hotelsService.view(id).subscribe((data) => {
      this.hotel = data;
    });
  }

  create() {
    this.hotelsService.create(this.hotel).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado exitosamente", "success");
      this.router.navigate(["hoteles/list"]);
    });
  }
  update() {
    this.hotelsService.update(this.hotel).subscribe((data) => {
      Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
      this.router.navigate(["hoteles/list"]);
    });
  }
}
