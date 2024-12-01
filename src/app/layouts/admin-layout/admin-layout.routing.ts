import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  {
    path: "administradores",
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
