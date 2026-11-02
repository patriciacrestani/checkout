import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-pedido-page',
  templateUrl: './pedido-page.html',
})
export class PedidoPage {
  protected readonly router = inject(Router);

  protected continuarParaPagamento(): void {
    this.router.navigate(['/pagamento']);
  }
}