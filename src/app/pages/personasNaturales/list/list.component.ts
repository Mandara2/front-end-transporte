import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/models/administrador/administrador.model';
import { PersonaNatural } from 'src/app/models/personaNatural/persona-natural.model';
import { PersonaNaturalService } from 'src/app/services/personasNaturales/personas-naturales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  personasNaturales: PersonaNatural[];
  constructor(private personasNaturalesService: PersonaNaturalService,
                      private router: Router
  ) {
    this.personasNaturales=[];
  }

  ngOnInit(): void {
    this.list()
  }
  create() {
    this.router.navigate(["personasNaturales/create"])
  }
  list() {
    this.personasNaturalesService.list().subscribe(data => {
      this.personasNaturales = data
    })
  }
  update(id:number) {
    this.router.navigate(["personasNaturales/update"+id])
  }
  view(id:number) {
    this.router.navigate(["personasNaturales/view/"+id])
  }
  delete(id:number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡La persona se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "¡Si, elimina esto!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.personasNaturalesService.delete(id).subscribe(data => {
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
