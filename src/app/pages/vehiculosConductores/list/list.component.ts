import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/models/administrador/administrador.model';
import { VehiculoConductor } from 'src/app/models/vehiculoConductor/vehiculo-conductor.model';
import { VehiculoConductorService } from 'src/app/services/vehiculosConductores/vehiculos-conductores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  vehiculosConductores: VehiculoConductor[];
  constructor(private vehiculosConductoresService: VehiculoConductorService,
                      private router: Router
  ) {
    this.vehiculosConductores=[];
  }

  ngOnInit(): void {
    this.list()
  }
  create() {
    this.router.navigate(["vehiculosConductores/create"])
  }
  list() {
    this.vehiculosConductoresService.list().subscribe(data => {
      this.vehiculosConductores = data
    })
  }
  update(id:number) {
    this.router.navigate(["vehiculosConductores/update"+id])
  }
  view(id:number) {
    this.router.navigate(["vehiculosConductores/view/"+id])
  }
  delete(id:number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡La relación entre el vehiculo y el conductor se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "¡Si, elimina esto!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehiculosConductoresService.delete(id).subscribe(data => {
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
