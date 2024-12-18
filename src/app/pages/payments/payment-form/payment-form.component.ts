import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FacturaService } from "src/app/services/factura/factura.service";
import { SecurityService } from "src/app/services/security.service";
import { Factura } from "src/app/models/factura/factura.model";
import { Tarjeta } from "src/app/models/tarjeta/tarjeta.model";
import { TarjetaService } from "src/app/services/tarjeta.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-payment-form",
  templateUrl: "./payment-form.component.html",
  styleUrls: ["./payment-form.component.scss"],
})
export class PaymentFormComponent implements OnInit {
  factura: Factura; // Propiedad que contendrá la factura a pagar
  tarjetas: Tarjeta[] = []; // Tarjetas asociadas al usuario
  selectedTarjetaId: string; // Tarjeta seleccionada para el pago

  constructor(
    private activatedRoute: ActivatedRoute,
    private facturaService: FacturaService,
    private securityService: SecurityService,
    private tarjetaService: TarjetaService,
    private router: Router
  ) {}

  seleccionarTarjeta(id: string): void {
    this.selectedTarjetaId = id;
    console.log("Tarjeta seleccionada:", this.selectedTarjetaId);
  }

  ngOnInit(): void {
    // Obtener el ID de la factura desde los parámetros de la ruta
    const facturaId =
      this.activatedRoute.snapshot.queryParamMap.get("facturaId");

    if (facturaId) {
      // Convertir el ID de la factura de string a número
      const id = parseInt(facturaId, 10); // o usar +facturaId para convertirlo a número

      if (!isNaN(id)) {
        // Obtener los detalles de la factura
        this.facturaService.view(id).subscribe((factura) => {
          this.factura = factura;
        });
      } else {
        console.error("Factura ID no es un número válido");
      }
    }

    // Obtener las tarjetas asociadas al usuario
    const userId = this.securityService.activeUserSession._id;
    if (userId) {
      this.tarjetaService.getTarjetasByUserId(userId).subscribe((tarjetas) => {
        this.tarjetas = tarjetas;
      });
    }
  }

  procesarPago(): void {
    console.log(this.factura.id);
    console.log(this.selectedTarjetaId);
    if (this.factura && this.selectedTarjetaId) {
      const pagoData = {
        usuarioId: this.securityService.activeUserSession._id,
        tarjetaId: this.selectedTarjetaId,
        cedula: "123456789", // Aquí puedes obtener el valor de la cédula del usuario si es necesario
        nombre: this.securityService.activeUserSession.name, // Nombre del usuario logueado
        apellido: "Pérez", // Apellido del usuario logueado
        email: this.securityService.activeUserSession.email, // Email del usuario logueado
        telefono: "3001234567", // Teléfono del usuario logueado
        facturaId: this.factura.id,
      };

      // Llamar al servicio de Tarjeta para procesar el pago
      this.tarjetaService.procesarPago(pagoData).subscribe(
        (response) => {
          console.log("Pago procesado con éxito:", response);
          // Mostrar alerta de éxito
          Swal.fire({
            title: "Pago realizado con éxito",
            text: "Tu pago ha sido procesado correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
          }).then(() => {
            // Redirigir a la lista de facturas después de que el usuario cierre el Swal
            this.router.navigate(["/facturas/list"]);
          });
        },
        (error) => {
          console.error("Error al procesar el pago:", error);
          // Mostrar alerta de error
          Swal.fire({
            title: "Error al procesar el pago",
            text: "Hubo un problema al realizar el pago. Intenta nuevamente.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      );
    }
  }
}
