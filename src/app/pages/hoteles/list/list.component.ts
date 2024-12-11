import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Administrador } from "src/app/models/administrador/administrador.model";
import { Hotel } from "src/app/models/hotel/hotel.model";
import { HotelService } from "src/app/services/hoteles/hoteles.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  hoteles: Hotel[];
  constructor(private hotelesService: HotelService, private router: Router) {
    this.hoteles = [];
  }

  ngOnInit(): void {
    this.list();
  }
  create() {
    this.router.navigate(["hoteles/create"]);
  }
  list() {
    this.hotelesService.list().subscribe((data) => {
      this.hoteles = data;
    });
  }
  update(id: number) {
    this.router.navigate(["hoteles/update/" + id]);
  }
  view(id: number) {
    this.router.navigate(["hoteles/view/" + id]);
  }
  delete(id: number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡El hotel se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, elimina esto!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.hotelesService.delete(id).subscribe((data) => {
          this.ngOnInit();
          Swal.fire({
            title: "¡Eliminado correctamente!",
            text: "Tu elemento ha sido eliminado.",
            icon: "success",
          });
        });
      }
    });
  }
}
