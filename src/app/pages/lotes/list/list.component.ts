import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Administrador } from "src/app/models/administrador/administrador.model";
import { Lote } from "src/app/models/lote/lote.model";
import { LoteService } from "src/app/services/lotes/lotes.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  lotes: Lote[];
  constructor(private lotesService: LoteService, private router: Router) {
    this.lotes = [];
  }

  ngOnInit(): void {
    this.list();
  }
  create() {
    this.router.navigate(["lotes/create"]);
  }
  list() {
    this.lotesService.list().subscribe((data) => {
      this.lotes = data;
    });
  }
  update(id: number) {
    this.router.navigate(["lotes/update/" + id]);
  }
  view(id: number) {
    this.router.navigate(["lotes/view/" + id]);
  }
  delete(id: number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡El lote se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, elimina esto!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.lotesService.delete(id).subscribe((data) => {
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
