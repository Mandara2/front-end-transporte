import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/models/administrador/administrador.model';
import { Conductor } from 'src/app/models/conductor/conductor.model';
import { ConductorService } from 'src/app/services/conductores/conductores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  conductores: Conductor[];
  constructor(private conductoresService: ConductorService,
                      private router: Router
  ) {
    this.conductores=[];
  }

  ngOnInit(): void {
    this.list()
  }
  create() {
    this.router.navigate(["conductores/create"])
  }
  list() {
    this.conductoresService.list().subscribe(data => {
      this.conductores = data
    })
  }
  update(id:number) {
    this.router.navigate(["conductores/update"+id])
  }
  view(id:number) {
    this.router.navigate(["conductores/view/"+id])
  }
  delete(id:number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡El conductor se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "¡Si, elimina esto!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.conductoresService.delete(id).subscribe(data => {
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
