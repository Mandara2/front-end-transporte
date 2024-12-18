import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'node:console';
import { User } from 'src/app/models/user/user.model';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  user:User; //SIEMPRE PENSAR EN PROGRAMACION ORIENTADA A OBJETOS
  captchaToken: string | null = null; // Token del reCAPTCHA
  captchaResolved: boolean = false; // Indica si el reCAPTCHA fue resuelto
  constructor(private securityService: SecurityService,
              private router:Router
  ) {
    this.user={email: "", password: ""}
  }
  // Método que se ejecuta cuando se resuelve el reCAPTCHA
  onCaptchaResolved(token: string | null) {
    this.captchaResolved = !!token;
    this.captchaToken = token;
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  login() {
    if (!this.captchaResolved || !this.captchaToken) {
      Swal.fire('Error', 'Por favor, completa el reCAPTCHA.', 'error');
      return;
    }
  
    // Agregar el token al objeto user
    this.user.captchaToken = this.captchaToken;
  
    this.securityService.login(this.user).subscribe({
      next: (data) => {

        console.log("Esta es la datttaaaaa" + data.token);
        
        this.securityService.saveSession(data); // Guarda en el localStorage
        this.router.navigate(['dashboard']);
      },
      error: (error) => {
        console.log(error);
        
        Swal.fire('Autenticación Inválida', 'Usuario o contraseña inválido', 'error');
      }
    });
  }
  

}