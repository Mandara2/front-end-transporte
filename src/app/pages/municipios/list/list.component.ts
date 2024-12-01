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
  municipios: Administrador[];
  constructor(private municipiosService: MunicipiosService,
                      private router: Router
  ) {
    this.municipios=[];
  }

  ngOnInit(): void {
    this.list()
  }
  create() {
    this.router.navigate(["municipios/create"])
  }
  list() {
    this.municipiosService.list().subscribe(data => {
      this.municipios = data
    })
  }
  update(id:number) {
    this.router.navigate(["municipios/update"+id])
  }
  view(id:number) {
    this.router.navigate(["municipios/view/"+id])
  }
  delete(id:number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡El municipio se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "¡Si, elimina esto!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.municipiosService.delete(id).subscribe(data => {
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
