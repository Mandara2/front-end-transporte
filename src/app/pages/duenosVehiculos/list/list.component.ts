import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DuenoVehiculo } from 'src/app/models/duenoVehiculo/dueno-vehiculo.model';
import { DuenoVehiculoService } from 'src/app/services/duenosVehiculos/duenos-vehiculos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  duenosVehiculos: DuenoVehiculo[];
  constructor(private duenosVehiculosService: DuenoVehiculoService,
                      private router: Router
  ) {
    this.duenosVehiculos=[];
  }

  ngOnInit(): void {
    this.list()
  }
  create() {
    this.router.navigate(["duenosVehiculos/create"])
  }
  list() {
    this.duenosVehiculosService.list().subscribe(data => {
      this.duenosVehiculos = data
    })
  }
  update(id:number) {
    this.router.navigate(["duenosVehiculos/update"+id])
  }
  view(id:number) {
    this.router.navigate(["duenosVehiculos/view/"+id])
  }
  delete(id:number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡La relación entre el dueño y el vehiculo se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "¡Si, elimina esto!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.duenosVehiculosService.delete(id).subscribe(data => {
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
