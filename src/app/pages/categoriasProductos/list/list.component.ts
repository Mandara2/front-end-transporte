import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/models/administrador/administrador.model';
import { CategoriaProducto } from 'src/app/models/categoriaProducto/categoria-producto.model';
import { CategoriaProductoService } from 'src/app/services/categoriasProductos/catagorias-productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  categoriasProductos: CategoriaProducto[];
  constructor(private categoriasProductosService: CategoriaProductoService,
                      private router: Router
  ) {
    this.categoriasProductos=[];
  }

  ngOnInit(): void {
    this.list()
  }
  create() {
    this.router.navigate(["categoriasProductos/create"])
  }
  list() {
    this.categoriasProductosService.list().subscribe(data => {
      this.categoriasProductos = data
    })
  }
  update(id:number) {
    this.router.navigate(["categoriasProductos/update"+id])
  }
  view(id:number) {
    this.router.navigate(["categoriasProductos/view/"+id])
  }
  delete(id:number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡La categoriaProducto se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "¡Si, elimina esto!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriasProductosService.delete(id).subscribe(data => {
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
