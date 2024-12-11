import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user/user.model';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfile: User ;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private usersService: UsuariosService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder //1. Vamos a inyectar FormBuilder: es el que establece las leyes que va a regir sobre este componente.
  ) {
    this.userProfile = {
      _id: "0",
      name: "",
      email: "",
      password: "",
      token: "",
    };
    this.mode = 0;
    this.configFormGroup(); // 3. Vamos a llamar el metodo de configFormGroup *si este no se llama, mejor dicho no hizo nada*, e iniciamos la variable trySend = false
    this.trySend = false;
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.userProfile._id = this.activateRoute.snapshot.params.id;
      this.getUserProfile(this.userProfile._id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      capacity: [
        0,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      location: ["", [Validators.required, Validators.minLength(2)]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getUserProfile(id: string) {
    this.usersService.view(id).subscribe((data) => {
      this.userProfile = data;
    });
  }

  create() {
    this.usersService.create(this.userProfile).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado exitosamente", "success");
      this.router.navigate(["usuarios/list"]);
    });
  }
  update() {
    this.usersService.update(this.userProfile).subscribe((data) => {
      Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
      this.router.navigate(["usuarios/list"]);
    });
  }

}
