import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Administrador } from "src/app/models/administrador/administrador.model";
import { Cuota } from "src/app/models/cuota/cuota.model";
import { CuotaService } from "src/app/services/cuotas/cuotas.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  cuotas: Cuota[];
  constructor(private cuotasService: CuotaService, private router: Router) {
    this.cuotas = [];
  }

  ngOnInit(): void {
    this.list();
  }
  create() {
    this.router.navigate(["cuotas/create"]);
  }
  list() {
    this.cuotasService.list().subscribe((data) => {
      this.cuotas = data;
    });
  }
  update(id: number) {
    this.router.navigate(["cuotas/update/" + id]);
  }
  view(id: number) {
    this.router.navigate(["cuotas/view/" + id]);
  }
  delete(id: number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡La cuota se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, elimina esto!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.cuotasService.delete(id).subscribe(
          () => {
            this.ngOnInit(); // Refresca la lista tras eliminar
            Swal.fire({
              title: "¡Eliminado correctamente!",
              text: "Tu elemento ha sido eliminado.",
              icon: "success",
            });
          },
          (error) => {
            console.error("¡Error eliminando elemento!", error); // Para depuración
            Swal.fire({
              title: "Error al eliminar",
              text: "No se pudo eliminar el elemento, ya que esta esta REFERENCIADA en otras clases. Por favor, intenta de nuevo.",
              icon: "error",
            });
          }
        );
      }
    });
  }
}
