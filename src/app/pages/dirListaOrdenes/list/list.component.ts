import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/models/administrador/administrador.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  dirListaOrdenes: Administrador[];
  constructor(private dirListaOrdenesService: DirListaOrdenesService,
                      private router: Router
  ) {
    this.dirListaOrdenes=[];
  }

  ngOnInit(): void {
    this.list()
  }
  create() {
    this.router.navigate(["dirListaOrdenes/create"])
  }
  list() {
    this.dirListaOrdenesService.list().subscribe(data => {
      this.dirListaOrdenes = data
    })
  }
  update(id:number) {
    this.router.navigate(["dirListaOrdenes/update"+id])
  }
  view(id:number) {
    this.router.navigate(["dirListaOrdenes/view/"+id])
  }
  delete(id:number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡El orden y la ruta se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "¡Si, elimina esto!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.dirListaOrdenesService.delete(id).subscribe(data => {
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
