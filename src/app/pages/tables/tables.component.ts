import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

 // Arreglo con los módulos cargados dinámicamente
 routes = [
  'administradores',
  'categorias',
  'categoriasProductos',
  'centrosDistribucion',
  'clientes',
  'conductores',
  'contratos',
  'cuotas',
  'departamentos',
  'direcciones',
  'dirListaOrdenes',
  'duenos',
  'duenosVehiculos',
  'empresas',
  'facturas',
  'gastos',
  'hoteles',
  'lotes',
  'municipios',
  'operaciones',
  'personasNaturales',
  'productos',
  'restaurantes',
  'rutas',
  'seguros',
  'servicios',
  'turnos',
  'vehiculos',
  'vehiculosConductores',
  'usuarios',
];

constructor(private router: Router) {}

// Método para redirigir a la ruta seleccionada
navigateTo(route: string, action: string) {
  this.router.navigate([`${route}/${action}`]);
}

// Hook de inicialización
ngOnInit(): void {
  console.log('TablesComponent inicializado');
  // Puedes agregar lógica aquí si necesitas inicializar datos o hacer verificaciones.
}


}