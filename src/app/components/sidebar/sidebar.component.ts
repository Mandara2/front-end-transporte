import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    type:number; //0 No esta logueado, solom mostrar si no esta logueado
                //1 Si esta logueado, mostrar solo si esta logueado
                //2 No importa, motrar siempre
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '', type: 2},
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '', type: 1},
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' , type: 1},
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '', type: 1},
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '', type: 0},
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '', type: 0},
    { path: '/thaters/list', title: 'Register',  icon:'ni-circle-08 text-pink', class: '', type: 1},
    { path: '/map', title:'Map', icon:"bi bi-truck text-red" ,class: '', type: 1 }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router,
              private securityService: SecurityService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}