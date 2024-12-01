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
  categorias: Administrador[];
  constructor(private categoriasService: CategoriasService,
                      private router: Router
  ) {
    this.categorias=[];
  }

  ngOnInit(): void {
    this.list()
  }
  create() {
    this.router.navigate(["categorias/create"])
  }
  list() {
    this.categoriasService.list().subscribe(data => {
      this.categorias = data
    })
  }
  update(id:number) {
    this.router.navigate(["categorias/update"+id])
  }
  view(id:number) {
    this.router.navigate(["categorias/view/"+id])
  }
  delete(id:number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡La categoria se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "¡Si, elimina esto!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriasService.delete(id).subscribe(data => {
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
