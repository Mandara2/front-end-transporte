import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Administrador } from "src/app/models/administrador/administrador.model";
import { Factura } from "src/app/models/factura/factura.model";
import { FacturaService } from "src/app/services/factura/factura.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  facturas: Factura[];
  constructor(private facturasService: FacturaService, private router: Router) {
    this.facturas = [];
  }

  ngOnInit(): void {
    this.list();
  }
  create() {
    this.router.navigate(["facturas/create"]);
  }
  list() {
    this.facturasService.list().subscribe((data) => {
      this.facturas = data;
    });
  }
  update(id: number) {
    this.router.navigate(["facturas/update/" + id]);
  }
  view(id: number) {
    this.router.navigate(["facturas/view/" + id]);
  }
  delete(id: number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡La factura se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, elimina esto!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.facturasService.delete(id).subscribe((data) => {
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
