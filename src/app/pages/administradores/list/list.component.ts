import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { log } from "console";
import { Administrador } from "src/app/models/administrador/administrador.model";
import { AdministradorService } from "src/app/services/administradores/administradores.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  administradores: Administrador[];
  constructor(
    private administradoresService: AdministradorService,
    private router: Router
  ) {
    this.administradores = [];
  }

  ngOnInit(): void {
    this.list();
  }
  create() {
    this.router.navigate(["administradores/create"]);
  }
  list() {
    this.administradoresService.list().subscribe((data) => {
      this.administradores = data;
      console.log("si entra");
    });
  }
  update(id: number) {
    this.router.navigate(["administradores/update/" + id]);
  }
  view(id: number) {
    this.router.navigate(["administradores/view/" + id]);
  }
  delete(id: number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡El administrador se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, elimina esto!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.administradoresService.delete(id).subscribe(
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
