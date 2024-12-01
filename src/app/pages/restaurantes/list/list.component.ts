import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/models/administrador/administrador.model';
import { Restaurante } from 'src/app/models/restaurante/restaurante.model';
import { RestauranteService } from 'src/app/services/restaurantes/restaurantes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  restaurantes: Restaurante[];
  constructor(private restaurantesService: RestauranteService,
                      private router: Router
  ) {
    this.restaurantes=[];
  }

  ngOnInit(): void {
    this.list()
  }
  create() {
    this.router.navigate(["restaurantes/create"])
  }
  list() {
    this.restaurantesService.list().subscribe(data => {
      this.restaurantes = data
    })
  }
  update(id:number) {
    this.router.navigate(["restaurantes/update"+id])
  }
  view(id:number) {
    this.router.navigate(["restaurantes/view/"+id])
  }
  delete(id:number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡El restaurante se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "¡Si, elimina esto!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.restaurantesService.delete(id).subscribe(data => {
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
