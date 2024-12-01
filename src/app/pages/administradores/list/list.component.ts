import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/models/administrador/administrador.model';
import { AdministradorService } from 'src/app/services/administradores/administradores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  administradores: Administrador[];
  constructor(private administradoresService: AdministradorService,
                      private router: Router
  ) {
    this.administradores=[];
  }

  ngOnInit(): void {
    this.list()
  }
  create() {
    this.router.navigate(["administradores/create"])
  }
  list() {
    this.administradoresService.list().subscribe(data => {
      this.administradores = data
    })
  }
  update(id:number) {
    this.router.navigate(["administradores/update"+id])
  }
  view(id:number) {
    this.router.navigate(["administradores/view/"+id])
  }
  delete(id:number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡El administrador se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "¡Si, elimina esto!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.administradoresService.delete(id).subscribe(data => {
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
