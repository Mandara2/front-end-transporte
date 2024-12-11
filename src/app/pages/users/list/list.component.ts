import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Administrador } from "src/app/models/administrador/administrador.model";
import { User } from "src/app/models/user/user.model";
import { Vehiculo } from "src/app/models/vehiculo/vehiculo.model";
import { UsuariosService } from "src/app/services/usuarios/usuarios.service";
import { VehiculoService } from "src/app/services/vehiculos/vehiculos.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  usuarios: User[];
  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    this.usuarios = [];
  }

  ngOnInit(): void {
    this.list();
  }
  create() {
    this.router.navigate(["usuarios/create"]);
  }
  list() {
    this.usuariosService.list().subscribe((data) => {
      this.usuarios = data;
    });
  }
  update(id: number) {
    this.router.navigate(["usuarios/update/" + id]);
  }
  view(id: number) {
    this.router.navigate(["usuarios/view/" + id]);
  }
  delete(id: number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡El vehiculo se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, elimina esto!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.delete(id).subscribe((data) => {
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
