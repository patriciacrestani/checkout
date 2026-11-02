import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutStore } from '../../shared/stores/checkout-store';
import { SumarioPedido } from '../../shared/components/sumario-pedido/sumario-pedido';

@Component({
  imports: [SumarioPedido],
  selector: 'app-pedido-page',
  templateUrl: './pedido-page.html',
})
export class PedidoPage {
  protected readonly router = inject(Router);
  readonly store = inject(CheckoutStore);

  protected continuarParaPagamento(): void {
    this.router.navigate(['/checkout/pagamento']);
  }
}