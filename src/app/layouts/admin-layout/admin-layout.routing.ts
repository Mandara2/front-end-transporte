import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { AuthenticatedGuard } from "src/app/guards/authenticated.guard";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  {
    path: "administradores",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/administradores/administradores.module").then(
            (m) => m.AdministradoresModule
          ),
      },
    ],
  },
  {
    path: "categorias",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/categorias/categorias.module").then(
            (m) => m.CategoriasModule
          ),
      },
    ],
  },
  {
    path: "categoriasProductos",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import(
            "src/app/pages/categoriasProductos/categorias-productos.module"
          ).then((m) => m.CategoriasProductosModule),
      },
    ],
  },
  {
    path: "centrosDistribucion",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import(
            "src/app/pages/centrosDistribucion/centros-distribucion.module"
          ).then((m) => m.CentrosDistribucionModule),
      },
    ],
  },
  {
    path: "clientes",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/clientes/clientes.module").then(
            (m) => m.ClientesModule
          ),
      },
    ],
  },
  {
    path: "conductores",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/conductores/conductores.module").then(
            (m) => m.ConductoresModule
          ),
      },
    ],
  },
  {
    path: "contratos",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/contratos/contratos.module").then(
            (m) => m.ContratosModule
          ),
      },
    ],
  },
  {
    path: "cuotas",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/cuotas/cuotas.module").then(
            (m) => m.CuotasModule
          ),
      },
    ],
  },
  {
    path: "departamentos",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/departamentos/departamentos.module").then(
            (m) => m.DepartamentosModule
          ),
      },
    ],
  },
  {
    path: "direcciones",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/direcciones/direcciones.module").then(
            (m) => m.DireccionesModule
          ),
      },
    ],
  },
  {
    path: "dirListaOrdenes",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/dirListaOrdenes/dir-lista-ordenes.module").then(
            (m) => m.DirListaOrdenesModule
          ),
      },
    ],
  },
  {
    path: "duenos",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/duenos/duenos.module").then(
            (m) => m.DuenosModule
          ),
      },
    ],
  },
  {
    path: "duenosVehiculos",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/duenosVehiculos/duenos-vehiculos.module").then(
            (m) => m.DuenosVehiculosModule
          ),
      },
    ],
  },
  {
    path: "empresas",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/empresas/empresas.module").then(
            (m) => m.EmpresasModule
          ),
      },
    ],
  },
  {
    path: "facturas",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/facturas/facturas.module").then(
            (m) => m.FacturasModule
          ),
      },
    ],
  },
  {
    path: "gastos",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/gastos/gastos.module").then(
            (m) => m.GastosModule
          ),
      },
    ],
  },
  {
    path: "hoteles",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/hoteles/hoteles.module").then(
            (m) => m.HotelesModule
          ),
      },
    ],
  },
  {
    path: "lotes",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/lotes/lotes.module").then((m) => m.LotesModule),
      },
    ],
  },
  {
    path: "municipios",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/municipios/municipios.module").then(
            (m) => m.MunicipiosModule
          ),
      },
    ],
  },
  {
    path: "operaciones",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/operaciones/operaciones.module").then(
            (m) => m.OperacionesModule
          ),
      },
    ],
  },
  {
    path: "personasNaturales",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import(
            "src/app/pages/personasNaturales/personas-naturales.module"
          ).then((m) => m.PersonasNaturalesModule),
      },
    ],
  },
  {
    path: "productos",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/productos/productos.module").then(
            (m) => m.ProductosModule
          ),
      },
    ],
  },
  {
    path: "restaurantes",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/restaurantes/restaurantes.module").then(
            (m) => m.RestaurantesModule
          ),
      },
    ],
  },
  {
    path: "rutas",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/rutas/rutas.module").then((m) => m.RutasModule),
      },
    ],
  },
  {
    path: "seguros",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/seguros/seguros.module").then(
            (m) => m.SegurosModule
          ),
      },
    ],
  },
  {
    path: "servicios",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/servicios/servicios.module").then(
            (m) => m.ServiciosModule
          ),
      },
    ],
  },
  {
    path: "turnos",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/turnos/turnos.module").then(
            (m) => m.TurnosModule
          ),
      },
    ],
  },
  {
    path: "vehiculos",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/vehiculos/vehiculos.module").then(
            (m) => m.VehiculosModule
          ),
      },
    ],
  },
  {
    path: "vehiculosConductores",
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import(
            "src/app/pages/vehiculosConductores/vehiculos-conductores.module"
          ).then((m) => m.VehiculosConductoresModule),
      },
    ],
  },
];
