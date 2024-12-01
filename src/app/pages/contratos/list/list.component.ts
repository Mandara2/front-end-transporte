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
  contratos: Administrador[];
  constructor(private contratosService: ContratosService,
                      private router: Router
  ) {
    this.contratos=[];
  }

  ngOnInit(): void {
    this.list()
  }
  create() {
    this.router.navigate(["contratos/create"])
  }
  list() {
    this.contratosService.list().subscribe(data => {
      this.contratos = data
    })
  }
  update(id:number) {
    this.router.navigate(["contratos/update"+id])
  }
  view(id:number) {
    this.router.navigate(["contratos/view/"+id])
  }
  delete(id:number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡El contrato se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "¡Si, elimina esto!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.contratosService.delete(id).subscribe(data => {
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
