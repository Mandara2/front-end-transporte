import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError, Observable } from "rxjs";
import Swal from "sweetalert2";
import { SecurityService } from "../services/security.service";
import { Router } from "@angular/router";

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {
  constructor(
    private securityService: SecurityService,

    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    

    // Si la solicitud es para la ruta de "login", no adjuntes el token

    if (
      request.url.includes("/login") || //Si la request esta pudiendo algo en el login
      request.url.includes("/token-validation")
    ) {

      console.log("no se pone token");
      return next.handle(request);

    } else {

      let theUser = this.securityService.activeUserSession; //Sobre escritura del metodo, capturamos el usuario, el que esta loguead
      const token = theUser["token"]; //Obtenemos el token
      
      console.log("colocando token " + token);

      // Adjunta el token a la solicitud

      const authRequest = request.clone({ //cloneme  esa carta
        setHeaders: {
          Authorization: `Bearer ${token}`, //Hacemos un cambio de encabezado
        },
      });

      return next.handle(authRequest).pipe( //Peitcion siga pero con el cambio de carta
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            Swal.fire({
              title: "No está autorizado para esta operación",

              icon: "error",

              timer: 5000,
            });

            this.router.navigateByUrl("/dashboard");      
          } else if (err.status === 400) {
            Swal.fire({
              title: "Existe un error, contacte al administrador",

              icon: "error",

              timer: 5000,
            });
          }

          return new Observable<never>();
        })
      );
    }

    // Continúa con la solicitud modificada
  }
}
