import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Administrador } from "src/app/models/administrador/administrador.model";
import { Producto } from "src/app/models/producto/producto.model";
import { ProductoService } from "src/app/services/productos/productos.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  productos: Producto[];
  constructor(
    private productosService: ProductoService,
    private router: Router
  ) {
    this.productos = [];
  }

  ngOnInit(): void {
    this.list();
  }
  create() {
    this.router.navigate(["productos/create"]);
  }
  list() {
    this.productosService.list().subscribe((data) => {
      this.productos = data;
    });
  }
  update(id: number) {
    this.router.navigate(["productos/update/" + id]);
  }
  view(id: number) {
    this.router.navigate(["productos/view/" + id]);
  }
  delete(id: number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡El producto se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, elimina esto!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.productosService.delete(id).subscribe((data) => {
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
