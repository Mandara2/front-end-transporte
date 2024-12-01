import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/models/administrador/administrador.model';
import { Direccion } from 'src/app/models/direccion/direccion.model';
import { DireccionService } from 'src/app/services/direcciones/direcciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  direcciones: Direccion[];
  constructor(private direccionesService: DireccionService,
                      private router: Router
  ) {
    this.direcciones=[];
  }

  ngOnInit(): void {
    this.list()
  }
  create() {
    this.router.navigate(["direcciones/create"])
  }
  list() {
    this.direccionesService.list().subscribe(data => {
      this.direcciones = data
    })
  }
  update(id:number) {
    this.router.navigate(["direcciones/update"+id])
  }
  view(id:number) {
    this.router.navigate(["direcciones/view/"+id])
  }
  delete(id:number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡La dirección se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "¡Si, elimina esto!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.direccionesService.delete(id).subscribe(data => {
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
