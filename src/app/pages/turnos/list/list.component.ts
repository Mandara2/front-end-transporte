import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Administrador } from "src/app/models/administrador/administrador.model";
import { Turno } from "src/app/models/turno/turno.model";
import { TurnoService } from "src/app/services/turnos/turnos.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  turnos: Turno[];
  constructor(private turnosService: TurnoService, private router: Router) {
    this.turnos = [];
  }

  ngOnInit(): void {
    this.list();
  }
  create() {
    this.router.navigate(["turnos/create"]);
  }
  list() {
    this.turnosService.list().subscribe((data) => {
      this.turnos = data;
    });
  }
  update(id: number) {
    this.router.navigate(["turnos/update/" + id]);
  }
  view(id: number) {
    this.router.navigate(["turnos/view/" + id]);
  }
  delete(id: number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡El turno se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, elimina esto!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.turnosService.delete(id).subscribe((data) => {
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
