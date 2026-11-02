import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PedidoService } from './shared/services/pedido/pedido-service';
import { CheckoutStore } from './shared/stores/checkout-store';
import { PagamentoService } from './shared/services/pagamento/pagamento-service';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  providers: [PagamentoService, PedidoService, CheckoutStore],
})
export class App implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly store = inject(CheckoutStore);

  ngOnInit(): void {
    // idealmente o id do pedido viria pela rota, mas como a integração é feita com mocks, isso foi simplificado
    const id = this.route.snapshot.paramMap.get('pedidoId') ?? '1';

    if (id) {
      this.store.carregarPedido(id);
    }
  }
}
