import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Administrador } from "src/app/models/administrador/administrador.model";
import { Gasto } from "src/app/models/gasto/gasto.model";
import { GastoService } from "src/app/services/gastos/gastos.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  gastos: Gasto[];
  constructor(private gastosService: GastoService, private router: Router) {
    this.gastos = [];
  }

  ngOnInit(): void {
    this.list();
  }
  create() {
    this.router.navigate(["gastos/create"]);
  }
  list() {
    this.gastosService.list().subscribe((data) => {
      this.gastos = data;
    });
  }
  update(id: number) {
    this.router.navigate(["gastos/update/" + id]);
  }
  view(id: number) {
    this.router.navigate(["gastos/view/" + id]);
  }
  delete(id: number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡El gasto se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, elimina esto!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.gastosService.delete(id).subscribe(
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
