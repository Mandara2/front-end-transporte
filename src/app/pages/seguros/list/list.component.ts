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
  seguros: Administrador[];
  constructor(private segurosService: SegurosService,
                      private router: Router
  ) {
    this.seguros=[];
  }

  ngOnInit(): void {
    this.list()
  }
  create() {
    this.router.navigate(["seguros/create"])
  }
  list() {
    this.segurosService.list().subscribe(data => {
      this.seguros = data
    })
  }
  update(id:number) {
    this.router.navigate(["seguros/update"+id])
  }
  view(id:number) {
    this.router.navigate(["seguros/view/"+id])
  }
  delete(id:number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡El seguro se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "¡Si, elimina esto!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.segurosService.delete(id).subscribe(data => {
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
