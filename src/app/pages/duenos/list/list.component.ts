import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Administrador } from "src/app/models/administrador/administrador.model";
import { Dueno } from "src/app/models/dueno/dueno.model";
import { DuenoService } from "src/app/services/duenos/duenos.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  duenos: Dueno[];
  constructor(private duenosService: DuenoService, private router: Router) {
    this.duenos = [];
  }

  ngOnInit(): void {
    this.list();
  }
  create() {
    this.router.navigate(["duenos/create"]);
  }
  list() {
    this.duenosService.list().subscribe((data) => {
      this.duenos = data;
    });
  }
  update(id: number) {
    this.router.navigate(["duenos/update/" + id]);
  }
  view(id: number) {
    this.router.navigate(["duenos/view/" + id]);
  }
  delete(id: number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡El dueño se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, elimina esto!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.duenosService.delete(id).subscribe((data) => {
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
