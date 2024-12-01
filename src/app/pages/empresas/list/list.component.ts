import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/models/administrador/administrador.model';
import { Empresa } from 'src/app/models/empresa/empresa.model';
import { EmpresaService } from 'src/app/services/empresas/empresas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  empresas: Empresa[];
  constructor(private empresasService: EmpresaService,
                      private router: Router
  ) {
    this.empresas=[];
  }

  ngOnInit(): void {
    this.list()
  }
  create() {
    this.router.navigate(["empresas/create"])
  }
  list() {
    this.empresasService.list().subscribe(data => {
      this.empresas = data
    })
  }
  update(id:number) {
    this.router.navigate(["empresas/update"+id])
  }
  view(id:number) {
    this.router.navigate(["empresas/view/"+id])
  }
  delete(id:number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡La empresa se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "¡Si, elimina esto!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.empresasService.delete(id).subscribe(data => {
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
