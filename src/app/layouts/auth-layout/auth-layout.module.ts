import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { GmapComponent } from 'src/app/pages/Gmap/gmap/gmap.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
    // NgbModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    GmapComponent
  ]
})
export class AuthLayoutModule { }
