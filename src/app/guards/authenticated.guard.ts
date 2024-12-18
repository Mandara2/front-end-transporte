import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private securityService: SecurityService,
    private router: Router
  ) {} 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.securityService.existSession()) {
      console.log("tienes permiso");
      
      // Si existe sesión, permite el acceso
      return true;
    } else {
      console.log("nada mano");
      
      // Si no hay sesión, redirige al login
      this.router.navigate(["/login"]);
      return false;
    }
  }
}  