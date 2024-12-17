import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FacturaService } from "src/app/services/factura/factura.service";
import { Factura } from "src/app/models/factura/factura.model";

@Component({
  selector: "app-payment-form",
  templateUrl: "./payment-form.component.html",
  styleUrls: ["./payment-form.component.scss"],
})
export class PaymentFormComponent implements OnInit {
  factura: Factura | null = null;

  constructor(
    private route: ActivatedRoute,
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const facturaId = params["facturaId"];
      if (facturaId) {
        this.cargarDetallesFactura(facturaId);
      }
    });
  }

  cargarDetallesFactura(id: number): void {
    this.facturaService.view(id).subscribe({
      next: (data) => {
        this.factura = data;
      },
      error: (err) => {
        console.error("Error al cargar la factura:", err);
        alert("Error al cargar los detalles de la factura.");
      },
    });
  }

  procesarPago(): void {
    if (this.factura) {
      console.log("Procesando pago para:", this.factura);
      alert(`Pago procesado para la Factura ID: ${this.factura.id}`);
      // Aquí integras tu lógica de pago con el microservicio
    } else {
      alert(
        "No se puede procesar el pago. Verifica los detalles de la factura."
      );
    }
  }
}
