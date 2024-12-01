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
  operaciones: Administrador[];
  constructor(private operacionesService: OperacionesService,
                      private router: Router
  ) {
    this.operaciones=[];
  }

  ngOnInit(): void {
    this.list()
  }
  create() {
    this.router.navigate(["operaciones/create"])
  }
  list() {
    this.operacionesService.list().subscribe(data => {
      this.operaciones = data
    })
  }
  update(id:number) {
    this.router.navigate(["operaciones/update"+id])
  }
  view(id:number) {
    this.router.navigate(["operaciones/view/"+id])
  }
  delete(id:number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡La operación se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "¡Si, elimina esto!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.operacionesService.delete(id).subscribe(data => {
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
