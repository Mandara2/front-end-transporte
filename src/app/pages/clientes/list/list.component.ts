import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente/cliente.model';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  clientes: Cliente[];
  constructor(private clientesService: ClienteService,
                      private router: Router
  ) {
    this.clientes=[];
  }

  ngOnInit(): void {
    this.list()
  }
  create() {
    this.router.navigate(["clientes/create"])
  }
  list() {
    this.clientesService.list().subscribe(data => {
      this.clientes = data
    })
  }
  update(id:number) {
    this.router.navigate(["clientes/update"+id])
  }
  view(id:number) {
    this.router.navigate(["clientes/view/"+id])
  }
  delete(id:number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡El cliente se eliminará para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "¡Si, elimina esto!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientesService.delete(id).subscribe(data => {
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
