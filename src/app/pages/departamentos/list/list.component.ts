import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/models/administrador/administrador.model';
import { Departamento } from 'src/app/models/departamento/departamento.model';
import { DepartamentoService } from 'src/app/services/departamentos/departamentos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  departamentos: Departamento[];
  constructor(private departamentosService: DepartamentoService,
                      private router: Router
  ) {
    this.departamentos=[];
  }

  ngOnInit(): void {
    this.list()
  }
  create() {
    this.router.navigate(["departamentos/create"])
  }
  list() {
    this.departamentosService.list().subscribe(data => {
      this.departamentos = data
    })
  }
  update(id:number) {
    this.router.navigate(["departamentos/update"+id])
  }
  view(id:number) {
    this.router.navigate(["departamentos/view/"+id])
  }
  delete(id:number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡El departamento se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "¡Si, elimina esto!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.departamentosService.delete(id).subscribe(data => {
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
