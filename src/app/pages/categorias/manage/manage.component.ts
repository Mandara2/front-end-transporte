import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria/categoria.model';
import { CategoriaService } from 'src/app/services/categorias/catorias.service';
import Swal from 'sweetalert2';



/* 
1. INYECTAR FORMBUILDER: ESTABLECE LAS LEYES 

2. DECLARAMOS theFromGroup Y EL trySend: LA PRIMERA ES EL POLICIA QUE HACE CUMPLIR LA LEYES, LA SEGUNDA
NOS VA A DECIR SI EL USUARIO YA INTENTÓ ACCEDER

3. LLAMAMOS EL METODO DE this.cofigFormlGroup EN EL CONSTRUCTOR E INICILIZAR trySend en false

4. CREAR EL METODO configFormGroup Y ESTABLECER LAS RELGAS (ESTE ES SIMILAR AL VALIDATOR DE ADONIS PERO EN METODO)
BUSCAR EN LA DOCUMENTACION DE "VALIDATORS ANGULAR"

5. DEFINIR EL METODO PPARA OBTENER EL FORMGROUP getTheFormGroup

6. CREAMOS LA ETIQUETA TIPO FORM Y HACEMOS REFERENCIA AL FORMGROUP

7. CADA UNO DE LOS TIPO INPUT O SELECT DEBEN DE TENER UN FORMCONTROLNAME

8. CONFIGURAMOS EL HTML PARA CONFIGURAR LA VISUALIZACION DE LAS ALERTAS

9. IMPORTAMOS  ReactiveFormsModulo


PARA RELACIONES



 */


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  categoria:Categoria
  //Si mode es igual 1 --> view, mode=2 --> create, mode=3 --> update
  mode: number;
  theFormGroup: FormGroup;
  trySend:boolean;
  constructor(private categoriaService: CategoriaService,
    private router:Router,   //Este es el que me ayuda a moverme entre las paginas
    private activateRoute:ActivatedRoute, //toma foto de la URl para sacar informacion de ella
    private theFormBuilder:FormBuilder
  ) {
    this.categoria = {id: 0 , nombre: "", descripcion: "",}
    this.mode = 0;
    this.configFormGroup()
    this.trySend = false
   }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.categoria.id = this.activateRoute.snapshot.params.id
      this.getTheater(this.categoria.id)
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      nombre:[0,[Validators.required,Validators.minLength(2),Validators.maxLength(12)]], //PARAMETROS EN ORDEN: VALOR POR DEFECTO, REQUEIRDO Y RANGO
      descripcion:[0,[Validators.required,Validators.maxLength(40)]],
      categoria_padre:[0,[Validators.min(1)]]

     
    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getTheater(id:number) {
    this.categoriaService.view(id).subscribe(data=>{
      this.categoria = data
    })
  }

  create() {
    if(this.theFormGroup.invalid){
      this.trySend= true 
      Swal.fire("Error en el formulario", "ingrese correctamente los datos ","error")
      return
    }
    this.categoriaService.create(this.categoria).subscribe(data=> {
      Swal.fire("Creado", "Se ha creado el teatro existosamente", "success")
      this.router.navigate(["adminitrador/list"]) //Aqui me muevo para el theaters list 
    })

  }

  update() {
    this.categoriaService.update(this.categoria).subscribe(data=> {
      Swal.fire("Actualizado", "Se ha actualizado el teatro existosamente", "success")
      this.router.navigate(["theaters/list"]) //Aqui me muevo para el theaters list 
    })
  }

}
