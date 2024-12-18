import { Categoria } from "../categoria/categoria.model";
import { Producto } from "../producto/producto.model";

export class CategoriaProducto {
  id?: number;
  producto_id: Producto;
  categoria_id: Categoria;
  detalle?: string;
}
/*update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Formulario inválido', 'Ingrese correctamente los datos', 'error');
      return;
    }
  
    // Asignar los datos del formulario
    const updatedConductor= this.theFormGroup.value;
  
    // Verificar si el ID del Conductor está disponible
    if (!this.conductor.id) {
      Swal.fire('Error', 'No se ha encontrado el Conductor para actualizar', 'error');
      return;
    }
  
    // Incluye el id del Conductor en el objeto que vas a enviar
    updatedConductor.id = this.conductor.id;
  
    console.log("Datos a actualizar:", updatedConductor);
  
    // Llamada al servicio para actualizar el Conductor
    this.conductorService.update(updatedConductor).subscribe({
      next: (data) => {
        Swal.fire('Éxito', 'Conductor actualizado exitosamente', 'success');
        this.router.navigate(['/vehiculos/list']);  // Redirige a la lista de Conductors
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo actualizar el Conductor', 'error');
        console.error('Error al actualizar Conductor:', err);
      }
    });*/
