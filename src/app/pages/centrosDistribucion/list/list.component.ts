import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/models/administrador/administrador.model';
import { CentroDistribucion } from 'src/app/models/centroDistribucion/centro-distribucion.model';
import { CentrosDistribucionService } from 'src/app/services/centrosDistribucion/centros-distribucion.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  centrosDistribucion: CentroDistribucion[];
  constructor(private centrosDistribucionService: CentrosDistribucionService,
                      private router: Router
  ) {
    this.centrosDistribucion=[];
  }

  ngOnInit(): void {
    this.list()
  }
  create() {
    this.router.navigate(["centrosDistribucion/create"])
  }
  list() {
    this.centrosDistribucionService.list().subscribe(data => {
      this.centrosDistribucion = data
    })
  }
  update(id:number) {
    this.router.navigate(["centrosDistribucion/update"+id])
  }
  view(id:number) {
    this.router.navigate(["centrosDistribucion/view/"+id])
  }
  delete(id:number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡El centro de distribucion se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "¡Si, elimina esto!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.centrosDistribucionService.delete(id).subscribe(data => {
          this.ngOnInit()
          Swal.fire({
            title: "¡Eliminado correctamente!",
            text: "Tu elemento ha sido eliminado.",
            icon: "success"
          })
        } 
         )
      }
    });
  }
}
