import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { NoAuthenticatedGuard } from 'src/app/guards/no-authenticated.guard';
import { GmapComponent } from '../../pages/Gmap/gmap/gmap.component';


export const AuthLayoutRoutes: Routes = [
    { path: 'login', canActivate:[NoAuthenticatedGuard], component: LoginComponent },
    { path: 'register',    canActivate:[NoAuthenticatedGuard],   component: RegisterComponent },
    {path: 'gmap', canActivate:[NoAuthenticatedGuard],component: GmapComponent }
];
